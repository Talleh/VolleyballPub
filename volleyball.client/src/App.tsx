import React, { useState } from 'react';

import './App.css';
import "react-toastify/dist/ReactToastify.css";

import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavigationBar from './components/navigationBarComponent';
import GamesComponent from './components/gamesComponent';
import GameComponent from './components/gameComponent';
import HallsComponent from './components/hallsComponent';
import NotFoundComponent from './components/notFoundComponent';
import { localStorageKeys, routers } from './constants';
import LanguageContext from './context/languageContext';
import strings, { setLanguage } from './services/localizationService';
import UserContext from './context/userContext';
import Player from './entities/player';
import ProtectedRoute from './components/protectedRoute';

function App() {
  const [language, setLanguageState] = useState(strings.getLanguage());
  const [player, setPlayer] = useState({} as Player | null);
  const [accessToken, setToken] = useState(localStorage.getItem(localStorageKeys.token));
  const updateLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };
  return (
    <UserContext.Provider value={{ token:accessToken, updateToken: (newToken) => { setToken(newToken); },
    currentPlayer:player, updatePlayer:(newPlayer) => {setPlayer(newPlayer);} }}>
      <LanguageContext.Provider value={{ currentLanguage: language, updateLanguage: updateLanguage }}>
        <div className="App">
          <header className="App-header" style={{ marginTop: 0, display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
            <ToastContainer />
            <NavigationBar />
            <span style={{ height: 40 }} />
            <Switch>
              <ProtectedRoute path={routers.game} component={GameComponent} />
              <Route path={routers.games} component={GamesComponent} />
              <Route exact path={routers.clubs} component={HallsComponent} />
              <Redirect exact from={routers.home} to={routers.games} />
              <Route path={routers.notFound} component={NotFoundComponent} />
              <Redirect to={routers.notFound} />
            </Switch>
          </header>
        </div>
      </LanguageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
