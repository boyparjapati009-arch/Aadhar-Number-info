import React from 'react';
import { AadhaarDetails } from '../types';

interface AadhaarResultsCardProps {
  details: AadhaarDetails;
}

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="py-3 border-b border-slate-200 dark:border-slate-700/50">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className="text-md font-medium text-slate-800 dark:text-slate-100">{value || '-'}</p>
  </div>
);

const AadhaarResultsCard: React.FC<AadhaarResultsCardProps> = ({ details }) => {
  return (
    <div className="w-full p-1 rounded-2xl bg-gradient-to-br from-cyan-500/50 to-purple-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-shadow duration-500 animate-result-appear">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-[14px] p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
          Aadhaar Details
        </h2>
        <div className="space-y-2">
          <DetailItem label="Address" value={details.address} />
          <DetailItem label="District Name" value={details.homeDistName} />
          <DetailItem label="State Name" value={details.homeStateName} />
          <DetailItem label="Scheme Name" value={details.schemeName} />
          <DetailItem label="Allowed On ORC" value={details.allowed_onorc} />
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Member Details</h3>
          <div className="space-y-4">
            {details.members && details.members.length > 0 ? (
              details.members.map((member, index) => (
                <div key={index} className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-cyan-600 dark:text-cyan-400">{member.memName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Relationship: {member.relation}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400">No member details available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AadhaarResultsCard;