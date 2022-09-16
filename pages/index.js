import Head from 'next/head'
import { useState } from 'react'
import Weather from '../components/Weather';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [err, setError] = useState(null);
  const [displayUnit, setDisplayUnit] = useState('F');

  let errElement = null;
  if (err) {
    errElement = <div class="error">{err}</div>
  }

  return (
    <div>
      <Head>
        <title>My stupid weather app</title>
        <meta name="description" content="a weather app that hits weather.gov's api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main-container">
        <h1>
          {location? `Weather for ${location}`: ''}
        </h1>
        {errElement}
        <button type="button" onClick={(e) => {
          e.preventDefault();
          setDisplayUnit(displayUnit == 'F' ? 'C' : 'F');
        }}>Display as {displayUnit == 'F' ? 'C' : 'F'}</button>
        <Weather displayUnit={displayUnit} onLocation={(locData) => {
          setLocation(`${locData.city}, ${locData.state}`);
        }} onError={(err) => {
          setError(err);
        }} />
      </div>

      <footer>
        
      </footer>
    </div>
  )
}
