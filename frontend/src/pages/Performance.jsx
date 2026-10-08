import React from 'react';
import { useStore } from '../store/useStore';
import { 
  TrendingUp, 
  Target, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BarChart2
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function Performance() {
  const { currentUser, performance } = useStore();

  const perfData = performance[currentUser.id] || performance['EMP-1024'];

  const radarData = [
    { subject: 'Technical', A: perfData.ratings?.technical || 92, fullMark: 100 },
    { subject: 'Communication', A: perfData.ratings?.communication || 84, fullMark: 100 },
    { subject: 'Teamwork', A: perfData.ratings?.teamwork || 88, fullMark: 100 },
    { subject: 'Productivity', A: perfData.ratings?.productivity || 86, fullMark: 100 },
    { subject: 'Problem Solving', A: perfData.ratings?.problemSolving || 89, fullMark: 100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Performance Management & Reviews</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Track employee KPI scores, manager reviews, skill competencies, and quarterly goals.
        </p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Overall Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Quarterly Performance Index</span>
            <span className="text-4xl font-extrabold text-emerald-400">{perfData.overallScore}%</span>
            <p className="text-[11px] text-slate-500 mt-1">{perfData.period}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl ring-1 ring-emerald-500/30">
            <Award className="w-8 h-8" />
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">KPI Goals Achieved</span>
            <span className="text-4xl font-extrabold text-indigo-400">
              {perfData.goals?.filter(g => g.status === 'COMPLETED').length}/{perfData.goals?.length}
            </span>
            <p className="text-[11px] text-indigo-300 mt-1">High Delivery Score</p>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl ring-1 ring-indigo-500/30">
            <Target className="w-8 h-8" />
          </div>
        </div>

        {/* Manager Feedback Rating */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Manager Review Rating</span>
            <span className="text-4xl font-extrabold text-amber-400">4.8 / 5.0</span>
            <p className="text-[11px] text-amber-300 mt-1">Exceeding Expectations</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl ring-1 ring-amber-500/30">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

      </div>

      {/* Main Grid: Radar Chart + Skill Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Competency Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" /> Skill Competency Radar
            </h3>
            <span className="text-xs text-indigo-300 font-mono">Q3 Review</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Performance" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Skill Breakdown Progress Bars */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
            Competency Rating Breakdown
          </h3>

          <div className="space-y-4 text-xs">
            {Object.entries(perfData.ratings || {}).map(([skill, score]) => (
              <div key={skill} className="space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span className="capitalize text-slate-300">{skill.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-indigo-400 font-mono">{score}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Goals & Manager Feedback Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Objectives / Goals */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" /> Quarterly OKRs & Objectives
          </h3>

          <div className="space-y-3">
            {perfData.goals?.map(goal => (
              <div key={goal.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-200">{goal.title}</h4>
                  <div className="text-[11px] text-slate-400 mt-1">Progress: {goal.progress}%</div>
                </div>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                  goal.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                }`}>
                  {goal.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Feedback */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" /> Executive Manager Feedback
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <p className="text-slate-300 leading-relaxed italic">
              "{perfData.managerFeedback}"
            </p>
            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between font-mono">
              <span>Reviewer: Sarah Jenkins (VP of Eng)</span>
              <span>Finalized Q3 2026</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
