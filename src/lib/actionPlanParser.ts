
export const parseActionPlan = (actionPlan: string) => {
  // Split by week patterns (Week 1, Week 2, etc. or similar patterns)
  const weekPattern = /(?:Week\s+\d+|WEEK\s+\d+|Week\s+[A-Z][a-z]+)[\s:]*(?:\n|$)/gi;
  
  // Find all week markers
  const weekMarkers = actionPlan.match(weekPattern) || [];
  
  if (weekMarkers.length === 0) {
    // If no week patterns found, try to split by numbered lists or bullet points
    const lines = actionPlan.split('\n').filter(line => line.trim());
    return lines.map((line, index) => ({
      week: `Step ${index + 1}`,
      content: line.trim()
    }));
  }
  
  // Split content by week markers
  const sections = actionPlan.split(weekPattern).filter(section => section.trim());
  
  return weekMarkers.map((marker, index) => ({
    week: marker.replace(/[\n:]/g, '').trim(),
    content: sections[index]?.trim() || ''
  }));
};
