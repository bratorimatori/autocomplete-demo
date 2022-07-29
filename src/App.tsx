import './App.css';
import Autocomplete from './components/autocomplete/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [hackerRankNews, setHackerRankNews] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=react'
      );
      let reactTopicTitle: string[] = [];
      result.data.hits.forEach((temp: any) => {
        reactTopicTitle.push(temp.title);
      });

      setHackerRankNews(reactTopicTitle);
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Autocomplete Demo</p>
        <Autocomplete options={hackerRankNews} />
      </header>
    </div>
  );
}

export default App;
