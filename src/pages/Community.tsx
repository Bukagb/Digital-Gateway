import React, { useState } from 'react';
import { Users, MessageSquare, Search, Plus, Sparkles, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CommunityGroup, UserProfile } from '../types';

interface CommunityProps {
  groups: CommunityGroup[];
  user: UserProfile;
}

export default function Community({ groups: initialGroups, user }: CommunityProps) {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const discussions = [
    { 
      id: 'd1',
      title: 'Best affordable housing in Porto?', 
      author: 'Maria S.', 
      replies: 24, 
      category: 'Housing',
      content: "Hi everyone! I just moved to Porto and I'm looking for a room that doesn't cost more than €400 including bills. Any specific neighborhoods you recommend that are still central but affordable?",
      comments: [
        { author: 'Kevin L.', text: 'Try looking in Paranhos! It\'s near the university polo and usually cheaper than Baixa.', time: '2h ago' },
        { author: 'Sofia G.', text: 'Bonfim is getting expensive but you might still find gems if you look Offline (signs on windows).', time: '5h ago' },
        { author: 'Ricardo M.', text: 'Avoid Cedofeita if you are on a tight budget. It\'s beautiful but touristy now.', time: '1d ago' }
      ]
    },
    { 
      id: 'd2',
      title: 'NIF appointment at Loja do Cidadão was super fast today!', 
      author: 'Kevin L.', 
      replies: 12, 
      category: 'Docs',
      content: "Just wanted to share that I went to the Loja do Cidadão at 8:30 AM and was out by 9:15 AM with my NIF. If you're struggling to get an appointment, try going early without one!",
      comments: [
        { author: 'Maria S.', text: 'That\'s great news! Which location did you go to?', time: '30m ago' },
        { author: 'Kevin L.', text: 'The one in Antas. Highly recommend!', time: '10m ago' }
      ]
    },
    { 
      id: 'd3',
      title: 'Is it hard to find part-time jobs while studying?', 
      author: 'Ahmed K.', 
      replies: 45, 
      category: 'Jobs',
      content: "I'm a master's student and I need some extra cash. How easy is it to find English-speaking part-time roles in retail or hospitality here?",
      comments: [
        { author: 'Lisa J.', text: 'Call centers (Teleperformance, Concentrix) are always hiring English/French/German speakers.', time: '1h ago' },
        { author: 'Pedro S.', text: 'Check the tourist shops in Ribeira, they always need English speakers.', time: '3h ago' }
      ]
    },
  ];

  // Dynamically update groups to match user data
  const groups = initialGroups
    .filter(group => {
      if (group.matchType === 'Same University' && user.motivation !== 'Study') return false;
      return true;
    })
    .map(group => {
      if (group.matchType === 'Same Arrival') {
        const arrival = user.arrivalDate ? new Date(user.arrivalDate) : null;
        // Handle potential invalid date or missing date
        const isValid = arrival && !isNaN(arrival.getTime());
        const month = isValid ? arrival!.toLocaleString('default', { month: 'long' }) : 'September';
        const year = isValid ? arrival!.getFullYear() : '2024';
        return {
          ...group,
          name: `Arriving in ${month} ${year}`,
          description: `Connect with others landing in Portugal in ${month}.`
        };
      }
      if (group.matchType === 'Same University') {
        return {
          ...group,
          name: user.university || 'Your University',
          description: `Official group for ${user.university || 'your university'} international students.`
        };
      }
      if (group.matchType === 'Same Nationality') {
        return {
          ...group,
          name: `${user.nationality || 'Your Country'} in ${user.city || 'Portugal'}`,
          description: `A space for ${user.nationality || 'students from your country'} studying in ${user.city || 'the city'}.`
        };
      }
      return group;
    });

  const handleJoinGroup = (groupId: string) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
    } else {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowQuestionModal(false);
      setQuestionText('');
    }, 2000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-n-800 mb-2">Community</h1>
          <p className="text-text-muted text-lg">Connect with students who share your journey.</p>
        </div>
        <button 
          onClick={() => setShowQuestionModal(true)}
          className="bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={20} /> Ask a Question
        </button>
      </div>

      {/* Smart Matches */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="text-accent" size={24} />
          <h2 className="text-2xl font-bold">Smart Matches for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              whileHover={{ y: -4 }}
              className={`bg-white p-6 rounded-[2.5rem] border shadow-soft group cursor-pointer transition-all ${
                joinedGroups.includes(group.id) ? 'border-primary' : 'border-teal-50 hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                  group.matchType === 'Same Arrival' ? 'bg-orange-50 text-orange-600' :
                  group.matchType === 'Same University' ? 'bg-primary-light text-primary' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {group.matchType}
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${group.id + i}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-50 flex items-center justify-center text-[10px] font-bold text-primary">
                    +{group.members - (joinedGroups.includes(group.id) ? 2 : 3)}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{group.name}</h3>
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                {group.description}
              </p>
              <button 
                onClick={() => handleJoinGroup(group.id)}
                className={`w-full py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  joinedGroups.includes(group.id) 
                    ? 'bg-primary text-white border-primary' 
                    : 'border-gray-100 text-text-muted hover:border-primary hover:text-primary'
                }`}
              >
                {joinedGroups.includes(group.id) ? (
                  <>
                    <CheckCircle2 size={16} /> Joined
                  </>
                ) : 'Join Group'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Question Modal */}
      <AnimatePresence>
        {showQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSuccess && setShowQuestionModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-lg w-full"
            >
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-ink">Question Posted!</h3>
                  <p className="text-gray-500">The community will be notified. You'll get an alert when someone replies.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-ink">Ask the Community</h3>
                    <button 
                      onClick={() => setShowQuestionModal(false)}
                      className="text-gray-400 hover:text-ink transition-colors"
                    >
                      <Plus className="rotate-45" size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleAskQuestion} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Question</label>
                      <textarea 
                        autoFocus
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="e.g., Best place to find affordable housing in Porto?"
                        className="w-full h-32 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-ink font-medium"
                      />
                    </div>
                    <div className="flex gap-2">
                      {['Housing', 'Docs', 'Jobs', 'Uni'].map(tag => (
                        <button key={tag} type="button" className="px-3 py-1 bg-teal-50 text-primary text-[10px] font-bold rounded-lg border border-primary/10">
                          {tag}
                        </button>
                      ))}
                    </div>
                    <button 
                      type="submit"
                      disabled={!questionText.trim()}
                      className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                    >
                      Post Question
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Trending Discussions</h2>
          <div className="space-y-4">
            {discussions.map((topic, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedDiscussion(topic)}
                className="bg-white p-6 rounded-[2rem] border border-teal-50 shadow-soft hover:shadow-lg transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main group-hover:text-primary transition-colors">{topic.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{topic.author}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{topic.category}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-main">{topic.replies}</p>
                  <p className="text-[10px] text-text-muted uppercase font-bold">REPLIES</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Discussion Modal */}
      <AnimatePresence>
        {selectedDiscussion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDiscussion(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-primary-light text-primary text-[10px] font-black uppercase tracking-widest rounded-md">
                      {selectedDiscussion.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">Posted by {selectedDiscussion.author}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-ink leading-tight">{selectedDiscussion.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedDiscussion(null)}
                  className="text-gray-400 hover:text-ink transition-colors p-2"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl mb-8">
                <p className="text-text-main leading-relaxed">{selectedDiscussion.content}</p>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Replies ({selectedDiscussion.replies})</h4>
                <div className="space-y-4">
                  {selectedDiscussion.comments.map((comment: any, i: number) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`} alt="User" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-ink">{comment.author}</span>
                          <span className="text-[10px] text-gray-400">{comment.time}</span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex gap-4">
                  <textarea 
                    placeholder="Write a reply..."
                    className="flex-1 p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-sm h-12"
                  />
                  <button className="bg-primary text-white font-bold p-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Popular Topic Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-2xl flex items-center justify-center">
                    <Search size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ink">{selectedTopic}</h3>
                    <p className="text-xs text-text-muted">Browsing all related discussions</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTopic(null)} className="text-gray-400 hover:text-ink transition-colors p-2">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {discussions.filter(d => d.category === selectedTopic || selectedTopic === 'University' || selectedTopic === 'Food').length > 0 ? (
                  discussions.filter(d => d.category === selectedTopic || (selectedTopic === 'Food' && d.category === 'Housing')).map((topic, i) => (
                    <div 
                      key={topic.id} 
                      onClick={() => {
                        setSelectedTopic(null);
                        setSelectedDiscussion(topic);
                      }}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary transition-colors cursor-pointer"
                    >
                      <h4 className="font-bold text-ink text-sm mb-1">{topic.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <span>{topic.author}</span>
                        <span>•</span>
                        <span className="text-primary">{topic.replies} Replies</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="text-gray-300" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No recent discussions in {selectedTopic} yet.</p>
                    <button 
                      onClick={() => {
                        setSelectedTopic(null);
                        setShowQuestionModal(true);
                      }}
                      className="mt-4 text-primary font-bold text-xs underline underline-offset-4"
                    >
                      Be the first to ask!
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Safety Guidelines Modal */}
      <AnimatePresence>
        {showGuidelines && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuidelines(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-xl w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ink">Community Guidelines</h3>
                    <p className="text-xs text-text-muted">Keeping our community safe & helpful</p>
                  </div>
                </div>
                <button onClick={() => setShowGuidelines(false)} className="text-gray-400 hover:text-ink transition-colors p-2">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Privacy First', text: 'Never post your NIF, Passport number, phone number, or home address in public threads.' },
                  { title: 'Be Respectful', text: 'We are students from all over the world. Be kind, inclusive, and patient with language barriers.' },
                  { title: 'No Scams', text: 'Do not attempt to sell products or services without admin approval. Report suspicious housing links.' },
                  { title: 'Source your Info', text: 'When giving legal advice (SEF/AIMA), mention if it\'s personal experience or from an official source.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-[10px] shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-ink mb-1">{item.title}</h4>
                      <p className="text-sm text-text-muted leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowGuidelines(false)}
                className="w-full mt-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {['Housing', 'Documents', 'Jobs', 'University', 'Nightlife', 'Food', 'Visa', 'Transport'].map((tag) => (
              <button 
                key={tag} 
                onClick={() => setSelectedTopic(tag)}
                className="px-4 py-2 bg-white border border-teal-50 rounded-xl text-sm font-medium hover:bg-teal-50 hover:text-primary hover:border-primary transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div className="bg-primary p-8 rounded-[2rem] text-white relative overflow-hidden mt-8 shadow-2xl shadow-primary/20">
             <div className="absolute top-0 right-0 p-10 bg-white/10 rounded-full -mr-10 -mt-10"></div>
             <h3 className="font-bold text-xl mb-2 relative z-10">Safety Tip</h3>
             <p className="text-sm text-teal-50 leading-relaxed mb-6 relative z-10">
               Never share your NIF or personal identification details publicly in the community threads.
             </p>
             <button 
              onClick={() => setShowGuidelines(true)}
              className="bg-white text-primary px-6 py-2.5 rounded-xl text-xs font-bold relative z-10"
             >
               Read Guidelines
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}

