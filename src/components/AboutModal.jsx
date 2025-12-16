import React from 'react';
import Modal from './Modal';
import { teamInfo } from '../data/mockData';
import { Users, Award } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-8">
        {/* Group Name */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-primary mb-4 tracking-tight">
            {teamInfo.groupName}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Topic */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8 border border-primary/10">
          <div className="flex items-start gap-3">
            <Award className="text-primary mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold text-dark mb-2">Giới thiệu đề tài</h3>
              <p className="text-gray-700 leading-relaxed">{teamInfo.topic}</p>
            </div>
          </div>
        </div>

        {/* Members */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-primary" size={24} />
            <h3 className="text-2xl font-bold text-dark">Thành viên nhóm</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamInfo.members.map((member, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-lg">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
