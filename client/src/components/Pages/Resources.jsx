import React, { useState } from 'react';
import { FaHeartbeat, FaFirstAid, FaBrain, FaBone, FaLungs, FaAllergies, FaBandAid, FaFire, FaSearch, FaChevronDown, FaChevronRight, FaPlayCircle } from 'react-icons/fa';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGuide, setExpandedGuide] = useState(null);
  
  const emergencyCategories = [
    { id: 'all', name: 'All Emergencies', icon: <FaFirstAid /> },
    { id: 'cardiac', name: 'Cardiac', icon: <FaHeartbeat /> },
    { id: 'neurological', name: 'Neurological', icon: <FaBrain /> },
    { id: 'trauma', name: 'Trauma', icon: <FaBone /> },
    { id: 'respiratory', name: 'Respiratory', icon: <FaLungs /> },
    { id: 'allergic', name: 'Allergic', icon: <FaAllergies /> },
    { id: 'wounds', name: 'Wounds', icon: <FaBandAid /> },
    { id: 'burns', name: 'Burns', icon: <FaFire /> },
  ];
  
  const emergencyGuides = [
    {
      id: 'heart-attack',
      title: 'Heart Attack',
      category: 'cardiac',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/gDwt7dD3awc',
      symptoms: [
        'Chest pain or discomfort',
        'Upper body pain (arms, neck, jaw, back)',
        'Shortness of breath',
        'Cold sweat',
        'Nausea',
        'Lightheadedness'
      ],
      steps: [
        'Call emergency services (911) immediately',
        'Have the person sit down and rest in a position that makes breathing comfortable',
        'Loosen any tight clothing',
        'If the person is not allergic to aspirin and has no recent bleeding, give them an aspirin to chew (if available)',
        'If the person becomes unresponsive, begin CPR if you\'re trained to do so',
        'If an automated external defibrillator (AED) is available, use it following the instructions'
      ],
      doNot: [
        'Don\'t leave the person alone except to call for help',
        'Don\'t let the person drive themselves to the hospital',
        'Don\'t wait to see if symptoms go away'
      ]
    },
    {
      id: 'stroke',
      title: 'Stroke',
      category: 'neurological',
      thumbnail: 'https://images.unsplash.com/photo-1614347636902-bdfaedace263?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/MsIUwZBVUBk',
      symptoms: [
        'Sudden numbness or weakness in face, arm, or leg (especially on one side)',
        'Sudden confusion or trouble speaking',
        'Sudden trouble seeing',
        'Sudden trouble walking, dizziness, loss of balance',
        'Sudden severe headache'
      ],
      steps: [
        'Call emergency services (911) immediately',
        'Note the time when symptoms started',
        'Perform the FAST test: Face (smile - is one side drooping?), Arms (raise both - does one drift down?), Speech (repeat a phrase - is it slurred?), Time (note when symptoms started and call 911)',
        'Keep the person lying down with their head slightly elevated',
        'Do not give them medication, food, or drinks'
      ],
      doNot: [
        'Don\'t give aspirin as it could worsen certain types of stroke',
        'Don\'t delay calling for help to see if symptoms improve',
        'Don\'t give food or drinks as the person may have difficulty swallowing'
      ]
    },
    {
      id: 'choking',
      title: 'Choking',
      category: 'respiratory',
      thumbnail: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/PA9hpOnvtCk',
      symptoms: [
        'Inability to talk, cry, or make noise',
        'Difficulty breathing or noisy breathing',
        'Squeezing the throat with hands',
        'Weak, ineffective cough',
        'Blue or dusky colored skin, lips, and nails',
        'Loss of consciousness if blockage is not cleared'
      ],
      steps: [
        'For a conscious adult or child over 1 year: Stand behind the person with one foot forward to provide support',
        'Wrap your arms around their waist',
        'Make a fist with one hand and place it above the navel (but below the ribcage)',
        'Grab your fist with your other hand',
        'Perform quick upward and inward thrusts (Heimlich maneuver) until the object is expelled',
        'If the person becomes unconscious, lower them to the ground and begin CPR if trained',
        'For infants under 1 year: Place infant face down on your forearm, supporting their head, and give 5 back blows with the heel of your hand, then turn infant over and give 5 chest thrusts'
      ],
      doNot: [
        'Don\'t perform abdominal thrusts on pregnant women or obese individuals (use chest thrusts instead)',
        'Don\'t slap a choking person on the back while they are upright (this can cause the object to lodge further)',
        'Don\'t try to grab the object blindly with your fingers (this can push it deeper)'
      ]
    },
    {
      id: 'severe-bleeding',
      title: 'Severe Bleeding',
      category: 'wounds',
      thumbnail: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/NxO5LvgqZe0',
      symptoms: [
        'Blood spurting or flowing freely from a wound',
        'Blood soaking through clothing or bandages',
        'Blood pooling on the ground',
        'Pale, cold, clammy skin',
        'Weakness, confusion, or unconsciousness'
      ],
      steps: [
        'Call emergency services (911) immediately',
        'Remove any obvious debris from the wound (do not remove embedded objects)',
        'Apply direct pressure with a clean cloth, bandage, or your hand if nothing else is available',
        'If possible, elevate the wounded area above the heart',
        'Apply pressure continuously for at least 15 minutes',
        'If bleeding continues, add more gauze or cloth on top (don\'t remove the first layer)',
        'If bleeding is severe and on a limb, consider applying a tourniquet if trained to do so, as a last resort'
      ],
      doNot: [
        'Don\'t remove large embedded objects from wounds',
        'Don\'t apply a tourniquet unless properly trained and as a last resort',
        'Don\'t release pressure to check if bleeding has stopped until sufficient time has passed'
      ]
    },
    {
      id: 'fractures',
      title: 'Fractures (Broken Bones)',
      category: 'trauma',
      thumbnail: 'https://images.unsplash.com/photo-1579684453377-968c2669e697?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/iJKN7_vJYIw',
      symptoms: [
        'Pain that intensifies with movement',
        'Swelling and bruising',
        'Deformity or abnormal bend',
        'Limited mobility or inability to move the area',
        'Grinding sensation or sound (crepitus)',
        'Visible bone protruding (open fracture)'
      ],
      steps: [
        'Call emergency services (911) for severe fractures',
        'Keep the person still and don\'t move the injured area',
        'Immobilize the area using a splint if trained to do so',
        'Apply ice wrapped in cloth to reduce swelling (20 minutes on, 20 minutes off)',
        'For open fractures, cover the wound with a clean cloth or bandage',
        'Treat for shock if necessary by lying the person flat, keeping them warm, and elevating legs if not broken'
      ],
      doNot: [
        'Don\'t try to realign or push a bone back in place',
        'Don\'t move the person unless absolutely necessary',
        'Don\'t apply ice directly to the skin',
        'Don\'t give food or drink, as surgery may be needed'
      ]
    },
    {
      id: 'seizure',
      title: 'Seizure',
      category: 'neurological',
      thumbnail: 'https://images.unsplash.com/photo-1576671414121-aa2c1ca117b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/gG4TlgjO0RA',
      symptoms: [
        'Temporary confusion',
        'Staring spell',
        'Uncontrollable jerking movements of arms and legs',
        'Loss of consciousness or awareness',
        'Cognitive or emotional symptoms (fear, anxiety, déjà vu)'
      ],
      steps: [
        'Time the seizure - call 911 if it lasts longer than 5 minutes',
        'Help the person to the ground and clear away dangerous objects',
        'Place the person on their side to prevent choking',
        'Cushion their head with something soft',
        'Loosen tight clothing around the neck',
        'Stay with the person until they are fully conscious and aware',
        'After the seizure, reassure the person and help them remain calm'
      ],
      doNot: [
        'Don\'t hold the person down or restrain their movements',
        'Don\'t put anything in their mouth',
        'Don\'t offer food or drink until fully alert',
        'Don\'t attempt CPR unless the person is not breathing after the seizure stops'
      ]
    },
    {
      id: 'burns',
      title: 'Burns',
      category: 'burns',
      thumbnail: 'https://images.unsplash.com/photo-1603721061016-77df0d6a1c83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/EaJmzB8YgS0',
      symptoms: [
        'Redness and pain (1st degree)',
        'Swelling and blistering (2nd degree)',
        'White, charred, or leathery skin (3rd degree)',
        'Shock symptoms in severe cases (pale skin, weakness, bluish lips)'
      ],
      steps: [
        'Ensure safety first - remove the person from danger',
        'For minor burns: Cool the burn with cool (not cold) running water for 10-15 minutes',
        'Remove jewelry or tight items from the burned area before swelling',
        'Cover the burn with a clean, dry bandage or cloth',
        'For severe burns: Call 911 immediately',
        'Do not immerse large severe burns in water (may cause shock)',
        'Elevate the burned area above heart level if possible',
        'Watch for signs of shock and cover the person with a blanket to keep warm'
      ],
      doNot: [
        'Don\'t use ice, as it can damage tissue',
        'Don\'t apply butter, oil, or ointments to burns',
        'Don\'t break blisters',
        'Don\'t remove clothing stuck to the burn',
        'Don\'t use fluffy cotton or adhesive bandages'
      ]
    },
    {
      id: 'allergic-reaction',
      title: 'Severe Allergic Reaction (Anaphylaxis)',
      category: 'allergic',
      thumbnail: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      videoUrl: 'https://www.youtube.com/embed/PHpYecAjmDM',
      symptoms: [
        'Skin reactions (hives, itching, flushed or pale skin)',
        'Swelling of face, lips, tongue, or throat',
        'Difficulty breathing or wheezing',
        'Weak and rapid pulse',
        'Nausea, vomiting, or diarrhea',
        'Dizziness, fainting, or unconsciousness'
      ],
      steps: [
        'Call emergency services (911) immediately',
        'Ask if the person carries an epinephrine auto-injector (EpiPen) and help them use it if needed',
        'Have the person lie still on their back',
        'Loosen tight clothing and cover with a blanket',
        'If there\'s vomiting or bleeding from the mouth, turn the person on their side',
        'If there are no signs of breathing, coughing, or movement, begin CPR if trained'
      ],
      doNot: [
        'Don\'t wait to see if symptoms improve before calling for help',
        'Don\'t have the person stand or walk',
        'Don\'t give oral medications if the person is having difficulty breathing'
      ]
    }
  ];
  
  // Filter guides based on search and category
  const filteredGuides = emergencyGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Function to toggle guide expansion
  const toggleGuide = (id) => {
    if (expandedGuide === id) {
      setExpandedGuide(null);
    } else {
      setExpandedGuide(id);
      // Scroll to the selected guide
      setTimeout(() => {
        document.getElementById(`guide-${id}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Emergency Medical Resources</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            Learn how to respond to common medical emergencies with step-by-step guides and instructional videos
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 relative">
            <input
              type="text"
              placeholder="Search for emergency guides..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
          </div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            {emergencyCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full mr-3 whitespace-nowrap transition ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {activeCategory === 'all' 
            ? 'All Emergency Guides' 
            : `${emergencyCategories.find(c => c.id === activeCategory).name} Emergency Guides`}
        </h2>
        
        {filteredGuides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaFirstAid className="mx-auto text-5xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No emergency guides found</h3>
            <p className="text-gray-600">Try adjusting your search or category selection</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredGuides.map(guide => (
              <div 
                key={guide.id} 
                id={`guide-${guide.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div 
                  className="flex items-center cursor-pointer p-6"
                  onClick={() => toggleGuide(guide.id)}
                >
                  <div className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden bg-gray-200 mr-6">
                    <img 
                      src={guide.thumbnail} 
                      alt={guide.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {guide.symptoms.slice(0, 3).join(' • ')}
                      {guide.symptoms.length > 3 && ' • ...'}
                    </p>
                  </div>
                  <div className="ml-4">
                    {expandedGuide === guide.id ? (
                      <FaChevronDown className="text-gray-400 text-lg" />
                    ) : (
                      <FaChevronRight className="text-gray-400 text-lg" />
                    )}
                  </div>
                </div>
                
                {expandedGuide === guide.id && (
                  <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                    <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-md">
                      <iframe 
                        src={guide.videoUrl} 
                        title={`${guide.title} guide`} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Symptoms to Look For</h4>
                        <ul className="space-y-2">
                          {guide.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">What to Do</h4>
                        <ol className="space-y-2">
                          {guide.steps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-2 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-100">
                      <h4 className="text-lg font-semibold text-red-700 mb-2">What NOT to Do</h4>
                      <ul className="space-y-2">
                        {guide.doNot.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">✕</span>
                            <span className="text-red-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => window.open(guide.videoUrl, '_blank')}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                      >
                        <FaPlayCircle className="mr-2" />
                        Watch Full Video
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            The information provided in these guides is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition. 
            If you think you may have a medical emergency, call your doctor or emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources; 