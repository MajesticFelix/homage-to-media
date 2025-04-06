import { useState, useEffect } from 'react';
import styles from '../styles/SocialMediaFeed.module.css';

const mockPosts = [
  { type: 'news', content: 'Global temperatures rise to record levels', negative: true },
  { type: 'news', content: 'New study shows plastic pollution in oceans doubled since 2020', negative: true },
  { type: 'news', content: 'Tech companies pledge $1B toward climate solutions', negative: false },
  { type: 'news', content: 'Renewable energy surpasses coal for first time in history', negative: false },
  { type: 'news', content: 'Extreme weather events increased 40% over past decade', negative: true },
  { type: 'news', content: 'Scientists discover new method to capture carbon emissions', negative: false },

  { type: 'social', content: 'Why is nobody talking about this?', negative: true },
  { type: 'social', content: 'This is why we can\'t have nice things', negative: true },
  { type: 'social', content: 'We\'re literally watching the world burn and doing nothing', negative: true },
  { type: 'social', content: 'Another day, another climate disaster we ignore', negative: true },
  { type: 'social', content: 'The planet is dying and all we do is post about it', negative: true },
  { type: 'social', content: 'Remember when seasons were predictable? #ClimateChange', negative: true },

  { type: 'social', content: 'Just planted 20 trees with my community group! #JustTransition', negative: false },
  { type: 'social', content: 'My company went carbon neutral today! So proud', negative: false },
  { type: 'social', content: 'Check out my zero-waste grocery haul 🌱', negative: false },
  { type: 'social', content: 'POV: Me biking to work instead of driving #ClimateAction', negative: false },
  { type: 'social', content: 'This new tech that removes CO2 from air is incredible', negative: false },
  { type: 'social', content: 'Just switched to solar panels - my energy bill is now $0!', negative: false },

  { type: 'social', content: 'Taking action every day to #ProtectOurWinters ❄️', negative: false },
  { type: 'social', content: 'Join us this Friday for climate strike! #FridaysForFuture', negative: false },
  { type: 'social', content: 'My before/after beach cleanup photos 🌊 #CleanSeas', negative: false },
  { type: 'social', content: 'This glacier was here just 5 years ago... #ClimateChange', negative: true },
];

const SocialMediaFeed = ({ destructionLevel, interactionEvents }) => {
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    const lastInteraction = interactionEvents[interactionEvents.length - 1];
    
    if (lastInteraction && lastInteraction.id) {
      const randomIndex = Math.floor(Math.random() * mockPosts.length);
      const post = {
        ...mockPosts[randomIndex],
        id: `post-${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      setVisiblePosts(prev => {
        const newPosts = [post, ...prev].slice(0, 8);
        return newPosts;
      });
    }
  }, [interactionEvents]);
  
  const progressiveHeadlines = [
    'Climate crisis worsens as temperatures soar',
    'Social divisions deepen in online communities',
    'Coastal cities begin planning for sea level rise evacuation',
    'Global food shortages reported as crop failures increase',
    'Water rationing implemented in major cities worldwide',
    'Mass migration begins as regions become uninhabitable',
    'Governments declare state of emergency due to climate disasters',
    'Healthcare systems overwhelmed by heat-related illnesses',
    'Last remaining glacier in tropical region disappears',
    'UN warns point of no return has been reached for climate'
  ];

  useEffect(() => {
    if (destructionLevel % 10 === 0 && destructionLevel > 0) {
      const headlineIndex = Math.min(Math.floor(destructionLevel / 10) - 1, progressiveHeadlines.length - 1);
      const negativeNews = {
        type: 'news',
        content: progressiveHeadlines[headlineIndex],
        id: `disaster-${Date.now()}`,
        timestamp: new Date().toISOString(),
        highlight: true
      };
      
      setVisiblePosts(prev => [negativeNews, ...prev].slice(0, 8));
    }
  }, [destructionLevel]);

  return (
    <div className={styles.feedContainer}>
      <h3>Media Feed</h3>
      <div className={styles.posts}>
        {visiblePosts.map(post => (
          <div 
            key={post.id} 
            className={`
              ${styles.post} 
              ${post.type === 'news' ? styles.news : styles.social}
              ${post.negative ? styles.negative : ''}
              ${post.highlight ? styles.highlight : ''}
            `}
          >
            <div className={styles.postContent}>{post.content}</div>
            <div className={styles.postType}>{post.type === 'news' ? 'Breaking News' : 'Social Post'}</div>
          </div>
        ))}
        
        {visiblePosts.length === 0 && (
          <div className={styles.emptyFeed}>
            Interact with the sculpture to see media reactions...
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaFeed;
