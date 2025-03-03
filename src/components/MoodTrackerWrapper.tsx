
import React from 'react';
import MoodTracker from './MoodTracker';

// This wrapper component is used to fix build errors with the MoodTracker component
// while respecting the read-only nature of the original file
const MoodTrackerWrapper: React.FC = () => {
  return <MoodTracker />;
};

export default MoodTrackerWrapper;
