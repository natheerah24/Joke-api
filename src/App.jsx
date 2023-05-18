
import './App.css';
import React, { useEffect, useState } from 'react';
import Button from './components/Button.jsx';
import Setup from './components/Setup.jsx';
import Wrapper from './components/Wrapper.jsx';

function App() {
    const [joke, setJoke] = useState({});
    const [showJoke, setShowJoke] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [jokeType, setJokeType] = useState('Programming');

    const getJoke = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://v2.jokeapi.dev/joke/${jokeType}?blacklistFlags=racist,sexist,explicit`
            );
            const data = await response.json();
            console.log(data)
            setJoke(data);
            setShowJoke(false);
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getJoke();
    }, [jokeType]);

    return (
        <div className="wrapper">
            <Wrapper>
                <div>
                    <label htmlFor="jokeType" className="text-lg" style={{ marginBottom: '1rem' }}>
                        Choose Joke Type
                    </label>
                    <br />
                    <select
                        name="jokeType"
                        value={jokeType}
                        className="w-96 p-2 bg-white rounded text-black mt-8 bg-blue text-white"
                        onChange={(e) => setJokeType(e.target.value)}
                    >
                        <option value="Programming">Programming</option>
                        <option value="Dark">Dark</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Christmas">Christmas</option>
                    </select>
                </div>

                {isLoading ? (
                    <div>Loading joke</div>
                ) : (
                    <>
                        <Setup>
                            {Object.keys(joke).length > 0 && (
                                <>
                                    <div>
                                        <h1>{joke.joke ? <p>{joke.joke}</p> : joke.setup}</h1>
                                        <div className="p-10 justify-items-center">
                                            {showJoke && <h2 className="bg-blue p-3 rounded">{joke.delivery}</h2>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </Setup>

                        <div>
                            <Button onClick={() => getJoke()} className="button">
                                Generate Joke
                            </Button>
                            {joke.setup && !showJoke && (
                                <Button onClick={() => setShowJoke(true)} className="button">
                                    👀?
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </Wrapper>
        </div>
    );
}

export default App;
