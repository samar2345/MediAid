import React, { useState, useRef, useEffect } from 'react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaDesktop
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using react-router

const VideoChatPage = () => {
  const navigate = useNavigate(); // For navigation after call ends
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting', 'active', 'ended'
  const [remainingTime, setRemainingTime] = useState(30 * 60); // 30 minutes in seconds

  const {id} = useParams()
  // console.log(id);
  const [doctor, setDoctor] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const timerRef = useRef(null);

  // Timer management
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          endCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        const data = await response.json();
        console.log('Doctor Details:', data);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  // Media stream setup
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setCallStatus('active');
      } catch (error) {
        console.error('Error accessing media devices', error);
        setCallStatus('ended');
      }
    };

    startCamera();

    return () => {
      stopMediaStream();
    };
  }, []);

  // Stop media stream
  const stopMediaStream = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
  };

  // Toggle microphone
  const toggleMicrophone = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicMuted;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  // Screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });

        // Replace video track with screen share
        if (localStreamRef.current) {
          const videoTrack = screenStream.getVideoTracks()[0];
          const existingVideoTrack = localStreamRef.current.getVideoTracks()[0];

          localStreamRef.current.removeTrack(existingVideoTrack);
          localStreamRef.current.addTrack(videoTrack);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStreamRef.current;
          }

          videoTrack.onended = () => {
            toggleScreenShare();
          };
        }
      } else {
        // Revert to camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (localStreamRef.current) {
          const videoTrack = stream.getVideoTracks()[0];
          const existingVideoTrack = localStreamRef.current.getVideoTracks()[0];

          localStreamRef.current.removeTrack(existingVideoTrack);
          localStreamRef.current.addTrack(videoTrack);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStreamRef.current;
          }
        }
      }

      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error('Screen sharing error', error);
    }
  };

  // End call
  const endCall = () => {
    // Stop media stream
    stopMediaStream();

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Update call status
    setCallStatus('ended');

    // Optional: Navigate to a different page or show a modal
    navigate('/doctors'); // Adjust route as needed
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl h-[800px] rounded-2xl shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 rounded-l-2xl p-4 border-r flex flex-col">
          <div className="flex-grow">
            <h2 className="text-xl font-bold mb-4">Video Consultation</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Doctor Details</h3>
                <p>{doctor && `With  ${doctor.name}`}</p>
                <p className="text-sm text-gray-600">Neurologist</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Consultation Info</h3>
                <p>Duration: 30 mins</p>
                <p>Remaining: {formatTime(remainingTime)}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={endCall}
              disabled={callStatus === 'ended'}
            >
              End Consultation
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="w-3/4 relative">
          {/* Call Status Overlay */}
          {callStatus !== 'active' && (
            <div className="absolute inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
              <p className="text-white text-2xl">
                {callStatus === 'connecting'
                  ? 'Connecting...'
                  : 'Call Ended'}
              </p>
            </div>
          )}

          {/* Remote Video */}
          <div className="absolute inset-0 bg-black">
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              placeholder="Waiting for doctor to join..."
            />
          </div>

          {/* Local Video Preview */}
          <div className="absolute bottom-4 right-4 w-1/4 border-4 border-white rounded-lg overflow-hidden shadow-lg">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
            />
          </div>

          {/* Control Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={toggleMicrophone}
              className={`p-3 rounded-full ${isMicMuted
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
                }`}
              disabled={callStatus !== 'active'}
            >
              {isMicMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>

            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full ${isCameraOff
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700'
                }`}
              disabled={callStatus !== 'active'}
            >
              {isCameraOff ? <FaVideoSlash /> : <FaVideo />}
            </button>

            <button
              onClick={toggleScreenShare}
              className={`p-3 rounded-full ${isScreenSharing
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
                }`}
              disabled={callStatus !== 'active'}
            >
              <FaDesktop />
            </button>

            <button
              onClick={endCall}
              className="p-3 bg-red-500 text-white rounded-full"
            >
              <FaPhoneSlash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChatPage;