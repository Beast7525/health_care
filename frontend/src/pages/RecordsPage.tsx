import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../api/client';
import { 
  FileText, 
  Upload, 
  Search, 
  Trash2, 
  Eye, 
  X, 
  Sparkles, 
  FileCheck, 
  Stethoscope,
  Plus,
  CheckCircle2,
  FileUp,
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  BrainCircuit,
  Info
} from 'lucide-react';
import { MedicalRecord, MedicalTerm, LabValue } from '../types';

import { extractTextFromFile, analyzeMedicalText } from '../utils/documentParser';

export const RecordsPage: React.FC = () => {
  const { records, addRecord, addSavedRecord, deleteRecord, addDoctorQuestion, setCurrentPage } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRecord, setActiveRecord] = useState<MedicalRecord | null>(null);

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // AI Advice Analysis Modal State
  const [analysisResultModal, setAnalysisResultModal] = useState<{
    record: MedicalRecord;
    adviceTips: string[];
    doctorQuestions: string[];
  } | null>(null);

  // Form Fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MedicalRecord['category']>('Lab Results');
  const [newFacility, setNewFacility] = useState('');
  const [newDoctor, setNewDoctor] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newText, setNewText] = useState('');

  const categories = ['All', 'Lab Results', 'Imaging', 'Discharge Summary', 'Clinical Notes', 'Prescription'];

  const filteredRecords = records.filter(record => {
    const matchesCategory = selectedCategory === 'All' || record.category === selectedCategory;
    const matchesQuery = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.simplifiedSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      
      if (!newTitle) {
        setNewTitle(formattedTitle);
      }

      // Auto-categorize based on file name if obvious
      const nameLower = file.name.toLowerCase();
      if (nameLower.includes('xray') || nameLower.includes('x-ray') || nameLower.includes('mri') || nameLower.includes('scan') || nameLower.includes('ultrasound')) {
        setNewCategory('Imaging');
      } else if (nameLower.includes('prescription') || nameLower.includes('rx')) {
        setNewCategory('Prescription');
      } else if (nameLower.includes('discharge') || nameLower.includes('summary')) {
        setNewCategory('Discharge Summary');
      } else if (nameLower.includes('note') || nameLower.includes('consult')) {
        setNewCategory('Clinical Notes');
      }

      if (file.type.startsWith('text/')) {
        setIsExtractingText(true);
        try {
          setNewText(await extractTextFromFile(file));
        } catch (err) {
          console.error('Error reading text file:', err);
          setNewText('');
        } finally {
          setIsExtractingText(false);
        }
      } else {
        setNewText('');
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsUploading(true);

    try {
      if (uploadedFile) {
        const result = await apiClient.analyzeRecord(uploadedFile, {
          title: newTitle,
          category: newCategory,
          date: newDate,
          facility: newFacility,
          doctorName: newDoctor
        });
        const createdRecord: MedicalRecord = {
          ...result.record,
          id: result.record.id || result.record._id || `rec-${Date.now()}`
        };
        addSavedRecord(createdRecord);
        result.doctorQuestions.forEach(qText => {
          addDoctorQuestion(qText, newCategory === 'Lab Results' ? 'Lab Understanding' : 'Recovery Plan', `Generated from uploaded report "${newTitle}"`);
        });
        setAnalysisResultModal({ record: createdRecord, adviceTips: result.adviceTips, doctorQuestions: result.doctorQuestions });
      } else {
        const analysis = analyzeMedicalText(newText, newTitle, newCategory);
        const createdRecord = addRecord({
          title: newTitle,
          category: newCategory,
          date: newDate,
          facility: newFacility || 'City Health Medical Center',
          doctorName: newDoctor || 'Dr. Attending Physician',
          fileSize: '1.2 MB',
          fileType: 'png',
          rawText: newText || `PATIENT RECORD - ${newTitle.toUpperCase()}`,
          simplifiedSummary: analysis.simplifiedSummary,
          decodedTerms: analysis.decodedTerms,
          labValues: analysis.labValues
        });
        analysis.doctorQuestions.forEach(qText => {
          addDoctorQuestion(qText, newCategory === 'Lab Results' ? 'Lab Understanding' : 'Recovery Plan', `Generated from uploaded report "${newTitle}"`);
        });
        setAnalysisResultModal({ record: createdRecord, adviceTips: analysis.adviceTips, doctorQuestions: analysis.doctorQuestions });
      }

      setShowUploadModal(false);
      setUploadedFile(null);
      setNewTitle('');
      setNewFacility('');
      setNewDoctor('');
      setNewText('');
    } catch (error) {
      console.error('Upload analysis failed:', error);
      window.alert(error instanceof Error ? error.message : 'The document could not be analyzed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-teal-600" /> Medical Record Hub
            </span>
            <span className="text-xs text-slate-400 font-mono">Dynamic OCR Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            My Uploaded Health Records
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload any medical record (Blood panels, Diabetes reports, X-rays, MRI scans, Prescriptions) to decode terminology and receive advice matching your exact report.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all scale-100 hover:scale-[1.02]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Medical Record</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records or findings..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Records Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-blue-300 shadow-card hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  {record.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{record.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                {record.title}
              </h3>

              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span>{record.facility}</span> • <span className="font-mono">{record.fileSize}</span>
              </p>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {record.simplifiedSummary}
              </div>

              {record.decodedTerms && record.decodedTerms.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {record.decodedTerms.slice(0, 2).map(term => (
                    <span key={term.term} className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-medium border border-teal-100">
                      Decoded: {term.term}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveRecord(record)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Read & Decode</span>
              </button>

              <button
                onClick={() => deleteRecord(record.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RECORD READER & DECODER MODAL */}
      {activeRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="bg-gradient-to-r from-blue-900 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => setActiveRecord(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
                <span>{activeRecord.category}</span> • <span>{activeRecord.date}</span>
              </div>
              <h3 className="text-xl font-bold">{activeRecord.title}</h3>
              <p className="text-xs text-blue-200 mt-0.5">{activeRecord.facility} — {activeRecord.doctorName}</p>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
              <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-2">
                <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Plain-English Simplified Summary
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {activeRecord.simplifiedSummary}
                </p>
              </div>

              {activeRecord.labValues && activeRecord.labValues.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Extracted Metrics</h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Test Name</th>
                          <th className="p-3">Value</th>
                          <th className="p-3">Reference Range</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {activeRecord.labValues.map((val) => (
                          <tr key={val.testName} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-800">{val.testName}</td>
                            <td className="p-3 font-mono">{val.value} {val.unit}</td>
                            <td className="p-3 text-slate-500">{val.referenceRange}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                val.status === 'normal' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {val.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeRecord.decodedTerms && activeRecord.decodedTerms.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    Decoded Terms in This Report
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {activeRecord.decodedTerms.map((item) => (
                      <div key={item.term} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-900 text-xs">{item.term}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  Raw Extracted Text (OCR Output)
                </h4>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {activeRecord.rawText}
                </pre>
              </div>
            </div>

            <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveRecord(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MEDICAL RECORD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Upload className="w-4 h-4" /> Upload & Analyze Document
              </div>
              <h3 className="text-xl font-bold">Upload Previous Medical Record</h3>
              <p className="text-xs text-blue-200 mt-0.5">Select any medical report or scan to receive accurate advice derived from your document</p>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-slate-800 text-sm max-h-[75vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Select File from Device</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center bg-slate-50 hover:bg-blue-50/50 transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.txt"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <FileUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  {uploadedFile ? (
                    <div>
                      <p className="text-xs font-bold text-blue-900">{uploadedFile.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-slate-700">Click or drag & drop medical document</p>
                      <p className="text-[11px] text-slate-400">PDF, PNG, JPG, JPEG (Max 25MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Document Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chest X-Ray, Blood Sugar Report, Thyroid Panel, Spine MRI..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  >
                    <option value="Lab Results">Lab Results</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Discharge Summary">Discharge Summary</option>
                    <option value="Clinical Notes">Clinical Notes</option>
                    <option value="Prescription">Prescription</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Record Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Facility Name</label>
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    placeholder="e.g. City Health Center"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Doctor Name</label>
                  <input
                    type="text"
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    placeholder="e.g. Dr. Emily Chen"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Extracted Text / Doctor Notes (OCR Intake)</label>
                <textarea
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Paste or review extracted text from document..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium font-mono"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-teal-300" />
                      <span>Analyzing Report & Generating Advice...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-teal-300" />
                      <span>Upload & Analyze Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI REPORT ANALYSIS & ADVICE MODAL */}
      {analysisResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-white p-6 relative">
              <button
                onClick={() => setAnalysisResultModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Document Analysis Accurate
                </span>
              </div>
              <h3 className="text-xl font-bold mt-2">Analysis & Advice for {analysisResultModal.record.title}</h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Category: <strong>{analysisResultModal.record.category}</strong> • Date: {analysisResultModal.record.date}
              </p>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Report Summary ({analysisResultModal.record.title})
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {analysisResultModal.record.simplifiedSummary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  Personalized Non-Diagnostic Wellness Advice
                </h4>
                <div className="space-y-2">
                  {analysisResultModal.adviceTips.map((tip, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-2.5 text-xs text-slate-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {analysisResultModal.doctorQuestions.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    Recommended Questions for Your Doctor
                  </h4>
                  <div className="space-y-2">
                    {analysisResultModal.doctorQuestions.map((q, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 font-semibold flex items-center justify-between">
                        <span>"{q}"</span>
                        <span className="text-[10px] text-teal-700 font-bold bg-teal-100 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                          Added to Doctor Checklist
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Reminder: This advice is general lifestyle and recovery guidance based on your uploaded document text. It is not a clinical diagnosis.
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  setAnalysisResultModal(null);
                  setCurrentPage('guidance');
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
              >
                View Full Wellness Plan & Doctor Checklist &rarr;
              </button>

              <button
                onClick={() => setAnalysisResultModal(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
