import { useState, useEffect } from 'react';

 const MediaQuery= (props) =>
{
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(props.query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, props.query]);

  return matches;
}
export default MediaQuery;
