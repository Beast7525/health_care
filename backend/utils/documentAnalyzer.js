const metricRegex = /([a-zA-Z][a-zA-Z0-9\s\-/()]{2,30})[\s:=-]+([0-9]+(?:\.[0-9]+)?)\s*(mg\/dL|g\/dL|uIU\/mL|IU\/L|mmol\/L|%|bpm|mmHg|ng\/mL|pg\/mL|x10\^3\/uL|x10\^6\/uL)?/gi;

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function extractLabValues(text) {
  const values = [];
  const seen = new Set();
  let match;

  while ((match = metricRegex.exec(text)) !== null && values.length < 12) {
    const testName = match[1].trim().replace(/\s+/g, ' ');
    const key = testName.toLowerCase();
    if (seen.has(key) || /^(date|page|phone|fax|id|room|age)$/i.test(testName)) continue;
    seen.add(key);

    const value = Number(match[2]);
    let referenceRange = 'Review with your clinician';
    let status = 'normal';
    const lowerName = key;

    if (lowerName.includes('glucose')) {
      referenceRange = '70 - 99 mg/dL';
      status = value > 99 ? 'high' : value < 70 ? 'low' : 'normal';
    } else if (lowerName.includes('a1c') || lowerName.includes('hba1c')) {
      referenceRange = '< 5.7 %';
      status = value >= 5.7 ? 'high' : 'normal';
    } else if (lowerName.includes('cholesterol')) {
      referenceRange = '< 200 mg/dL';
      status = value >= 200 ? 'high' : 'normal';
    } else if (lowerName.includes('vitamin d')) {
      referenceRange = '30 - 100 ng/mL';
      status = value < 30 ? 'low' : 'normal';
    } else if (lowerName.includes('tsh')) {
      referenceRange = '0.4 - 4.0 uIU/mL';
      status = value < 0.4 ? 'low' : value > 4 ? 'high' : 'normal';
    }

    values.push({ testName, value: match[2], unit: match[3] || 'units', referenceRange, status });
  }

  return values;
}

export function analyzeExtractedDocument(text, title, category) {
  const normalized = normalizeText(text);
  const lower = `${title} ${category} ${normalized}`.toLowerCase();
  const labValues = extractLabValues(normalized);
  const decodedTerms = [];
  const adviceTips = [];
  const doctorQuestions = [];

  if (!normalized) {
    return {
      simplifiedSummary: `We could not read enough text from "${title}" to safely summarize it. Try a clearer, well-lit image or a text-based PDF.`,
      labValues,
      decodedTerms,
      adviceTips: ['Try uploading a sharper image with the full page visible.', 'Bring the original report to your clinician for interpretation.'],
      doctorQuestions: ['Could you help me interpret the findings in this report?']
    };
  }

  if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('a1c') || lower.includes('diabetes')) {
    decodedTerms.push({ term: 'Glucose / HbA1c', definition: 'Measures related to blood sugar. Their meaning depends on the test conditions and your health history.', category: 'Lab Metric' });
    adviceTips.push('Ask whether the test was fasting and what target range is appropriate for you.', 'Keep a note of symptoms, meals, medicines, and readings to discuss at follow-up.');
    doctorQuestions.push('What do these blood sugar results mean for me?', 'Should I repeat this test or arrange follow-up?');
  } else if (lower.includes('cholesterol') || lower.includes('lipid') || lower.includes('triglyceride')) {
    decodedTerms.push({ term: 'Lipid Panel', definition: 'A group of blood tests that measures fats such as cholesterol and triglycerides.', category: 'Lab Metric' });
    adviceTips.push('Ask your clinician how these results fit with your family history, medicines, and overall cardiovascular risk.', 'Keep regular movement and balanced meals in view while waiting for personalized medical advice.');
    doctorQuestions.push('Which result matters most in my overall risk picture?', 'Do I need a follow-up test or treatment discussion?');
  } else if (lower.includes('mri') || lower.includes('x-ray') || lower.includes('scan') || lower.includes('ultrasound') || lower.includes('fracture')) {
    decodedTerms.push({ term: 'Imaging Report', definition: 'A radiology description of structures seen in the scan. The impression should be discussed alongside your symptoms and examination.', category: 'Imaging' });
    adviceTips.push('Follow the activity and recovery instructions from your clinician, especially if pain or swelling changes.', 'Write down where symptoms occur and what makes them better or worse before your follow-up.');
    doctorQuestions.push('Which finding is most important for my symptoms?', 'What activity is safe while I recover?');
  } else if (lower.includes('prescription') || lower.includes('tablet') || lower.includes('capsule') || category === 'Prescription') {
    decodedTerms.push({ term: 'Medication Instructions', definition: 'Directions about how and when a medicine should be taken. Confirm them with a pharmacist or clinician.', category: 'Medication' });
    adviceTips.push('Do not change or stop a prescribed medicine without speaking with your clinician or pharmacist.', 'Keep a current list of medicines, supplements, allergies, and questions.');
    doctorQuestions.push('How should I take this medicine, and what side effects should I watch for?', 'Could this interact with my other medicines or supplements?');
  } else {
    decodedTerms.push({ term: 'Clinical Findings', definition: 'Words used in a medical report to describe observations. Their importance depends on your symptoms and clinical history.', category: 'Record Intake' });
    adviceTips.push('Review the findings with the clinician who ordered this report.', 'Keep track of new or worsening symptoms and bring the report to your next appointment.');
    doctorQuestions.push('Which findings in this report need follow-up?', 'What should I watch for before my next appointment?');
  }

  const metricSummary = labValues.length
    ? ` Detected values: ${labValues.map(value => `${value.testName} ${value.value} ${value.unit} (${value.status})`).join(', ')}.`
    : '';

  return {
    simplifiedSummary: `This summary was generated from the text read in your uploaded ${category.toLowerCase()} "${title}".${metricSummary} The result is informational and should be reviewed with a qualified clinician.`,
    labValues,
    decodedTerms,
    adviceTips,
    doctorQuestions
  };
}
