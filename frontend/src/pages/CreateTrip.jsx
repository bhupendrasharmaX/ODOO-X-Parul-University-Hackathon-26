import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pencil, MapPin, Calendar, UploadCloud, Eye } from 'lucide-react';

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', destination: '', startDate: '', endDate: '', description: '', coverImage: '' });
  const fileRef = useRef(null);

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Cities & Stops' },
    { num: 3, label: 'Budget' },
  ];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, coverImage: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] font-sans flex flex-col lg:flex-row">
      {/* Left Form */}
      <div className="flex-1 p-6 md:p-12 lg:pl-16 lg:pr-10 flex flex-col items-center">
        <div className="w-full max-w-xl">
          
          {/* Stepper */}
          <div className="bg-white rounded-2xl p-6 mb-10 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <div className="absolute w-[80%] max-w-sm h-1 bg-surface-200 left-1/2 -translate-x-1/2 top-[52px] -z-10 hidden sm:block" />
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-center flex-1 relative bg-white">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                  step === s.num ? 'bg-[#4f46e5] text-white' : 'bg-[#e2e8f0] text-[#64748b]'
                }`}>
                  {s.num}
                </div>
                <p className={`text-xs font-bold ${step === s.num ? 'text-[#4f46e5]' : 'text-[#64748b]'}`}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[24px] p-10 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-surface-100">
            {step === 1 && (
              <>
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold text-surface-900 mb-2">Trip Fundamentals</h2>
                  <p className="text-surface-500">Define the overarching details for this journey.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Trip Name</label>
                      <div className="relative">
                        <Pencil size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input type="text" placeholder="e.g. Summer in" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Primary Destination</label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input type="text" placeholder="Country or Region" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Start Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
                        <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-500 focus:border-primary-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">End Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none" />
                        <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})}
                          className="w-full pl-11 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-500 focus:border-primary-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Vibe / Description</label>
                    <textarea rows={3} placeholder="Describe the mood of the trip... (e.g., Relaxing wine tasting and cultural exploration)"
                      value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                      className="w-full p-4 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none resize-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Cover Photo</label>
                    <div onClick={() => fileRef.current?.click()}
                      className="w-full h-32 rounded-2xl border-2 border-dashed border-[#c7d2fe] bg-[#eef2ff]/50 flex flex-col items-center justify-center cursor-pointer hover:bg-[#eef2ff] transition-colors relative overflow-hidden">
                      {form.coverImage ? (
                        <img src={form.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4f46e5] mb-2">
                            <UploadCloud size={20} />
                          </div>
                          <p className="text-sm font-bold text-surface-900">Click to upload or drag and drop</p>
                          <p className="text-xs text-surface-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </>
                      )}
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold text-surface-900 mb-2">Cities & Stops</h2>
                  <p className="text-surface-500">Plan the major stops for your trip.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Stop 1</label>
                  <input type="text" placeholder="e.g. Paris" className="w-full p-3.5 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Stop 2</label>
                  <input type="text" placeholder="e.g. Lyon" className="w-full p-3.5 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="mb-10">
                  <h2 className="font-display text-3xl font-bold text-surface-900 mb-2">Budget Planning</h2>
                  <p className="text-surface-500">Calculate your estimated budget based on the duration of your trip.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Daily Budget per Person ($)</label>
                  <input type="number" placeholder="0" value={form.dailyBudget || ''} onChange={e => {
                    const daily = Number(e.target.value);
                    const duration = form.startDate && form.endDate ? Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000)) : 0;
                    setForm({...form, dailyBudget: daily, totalBudget: daily * duration});
                  }}
                  className="w-full p-3.5 bg-white border border-surface-200 rounded-xl text-sm focus:border-primary-500 outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-900 mb-2 tracking-wide uppercase">Total Estimated Budget ($)</label>
                  <div className="w-full p-4 bg-surface-50 border border-surface-200 rounded-xl text-xl font-bold text-surface-900">
                    ${(form.totalBudget || 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-surface-400 mt-2">
                    Calculation: ${form.dailyBudget || 0} / day &times; {form.startDate && form.endDate ? Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000)) : 0} days
                  </p>
                </div>
              </div>
            )}

            <div className="pt-8 mt-8 border-t border-surface-100 flex justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} className="px-8 py-3.5 bg-white border border-surface-200 hover:bg-surface-50 text-surface-700 font-bold text-sm rounded-xl transition-colors shadow-sm">
                  ← Previous
                </button>
              ) : <div></div>}
              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} className="px-8 py-3.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                  Next Step →
                </button>
              ) : (
                <button onClick={() => alert('Trip created successfully!')} className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors shadow-sm">
                  Create Trip ✓
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Preview */}
      <div className="hidden lg:flex lg:w-[480px] p-10 shrink-0 relative bg-surface-50 border-l border-surface-200 items-start justify-center pt-24">
        <div className="w-full bg-[#2A2B36] rounded-[24px] overflow-hidden shadow-2xl relative border border-white/5 h-[640px] flex flex-col">
          
          <div className="absolute top-5 right-5 z-20">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#b45309] text-white text-xs font-bold rounded-full shadow-lg">
              <Eye size={14} /> Live Preview
            </span>
          </div>

          <div className="h-[280px] w-full bg-[#1F2029] flex flex-col items-center justify-center relative">
            {form.coverImage ? (
              <img src={form.coverImage} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl border-2 border-white/10 flex items-center justify-center text-white/20 mb-3">
                  <span className="text-2xl font-bold font-display">🖼</span>
                </div>
                <p className="text-white/40 text-sm font-semibold">Preview Cover Image</p>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2B36] via-transparent to-transparent" />
          </div>

          <div className="p-10 flex-1 flex flex-col">
            <h2 className="font-display text-4xl font-bold text-white mb-2">{form.name || 'Untitled Journey'}</h2>
            <p className="text-[#818cf8] text-sm font-medium flex items-center gap-1.5 mb-10">
              <MapPin size={16} /> {form.destination || 'Destination pending'}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Dates</p>
                <p className="text-white font-medium text-sm">
                  {form.startDate && form.endDate 
                    ? `${new Date(form.startDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})} - ${new Date(form.endDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})}` 
                    : 'TBD'}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">Duration</p>
                <p className="text-white font-medium text-sm">
                  {form.startDate && form.endDate 
                    ? `${Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 86400000))} days` 
                    : '-'}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex-1">
              <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">Vibe</p>
              <p className="text-white/70 text-sm italic leading-relaxed">
                {form.description || 'Awaiting description...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
