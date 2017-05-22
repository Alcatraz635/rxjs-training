import Rx from 'rxjs';
import githubAPICall from './utils';

import '../styles/app.scss';

// Constants
const GITHUB_USERS_URL = 'https://api.github.com/users';

// DOM nodes
const suggestionOne = document.querySelector('#suggestion-one');
const suggestionTwo = document.querySelector('#suggestion-two');
const suggestionThree = document.querySelector('#suggestion-three');
let dismissOne = document.querySelector('#dismiss-one');
let dismissTwo = document.querySelector('#dismiss-two');
let dismissThree = document.querySelector('#dismiss-three');
const refresh = document.querySelector('.suggestions_refresh');

// Github api call request streams
const refreshClickStream = Rx.ConnectableObservable.fromEvent(refresh, 'click');
const requestStream = refreshClickStream.startWith('startup click').map(() => {
  const random = Math.floor(Math.random() * 500);
  return `${GITHUB_USERS_URL}?since=${random}`;
});

// Github api call response stream
const responseStream = requestStream.flatMap(requestUrl =>
  Rx.Observable.fromPromise(githubAPICall(requestUrl)),
);

// Githhub suggestion box rendering
const renderUser = (userData, userIndex) =>
  `
    <img src="${userData.avatar_url}" alt="${userData.login}" class="suggestions_user-image"/>
    <a href="${userData.html_url}" target="_blank" title="Visit ${userData.login} on Github." class="suggestions_user-name">${userData.login.toUpperCase()}</a>
    <span id="dismiss-${userIndex}" class="suggestions_user-dismiss">X</span>
  `;

const suggestionStreamOne = responseStream
  .map(users => users[Math.floor(Math.random() * users.length)])
  .merge(refreshClickStream.map(() => null))
  .startWith(null);
const suggestionStreamTwo = responseStream
  .map(users => users[Math.floor(Math.random() * users.length)])
  .merge(refreshClickStream.map(() => null))
  .startWith(null);
const suggestionStreamThree = responseStream
  .map(users => users[Math.floor(Math.random() * users.length)])
  .merge(refreshClickStream.map(() => null))
  .startWith(null);

suggestionStreamOne.subscribe((user) => {
  user === null
    ? (suggestionOne.innerHTML = '<span class="suggestions_loader"></span>')
    : (suggestionOne.innerHTML = renderUser(user, 'one'));
  dismissOne = document.querySelector('#dismiss-one');
});

suggestionStreamTwo.subscribe((user) => {
  user === null
    ? (suggestionTwo.innerHTML = '<span class="suggestions_loader"></span>')
    : (suggestionTwo.innerHTML = renderUser(user, 'two'));
  dismissTwo = document.querySelector('#dismiss-two');
});

suggestionStreamThree.subscribe((user) => {
  user === null
    ? (suggestionThree.innerHTML = '<span class="suggestions_loader"></span>')
    : (suggestionThree.innerHTML = renderUser(user, 'three'));
  dismissThree = document.querySelector('#dismiss-three');
});
