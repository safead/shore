**Tests**
npm test

or to check the tests coverage:
npm test -- --coverage

**Comments**

To have 100% tested code I need 6-8 additional hours (upon request). Some important features implemented:

- Redux state with separated reducers and persistent storage

- Online / Offline state for the app with queued actions, which require internet connection. This is supported by all modern browsers ( https://caniuse.com/#feat=online-status ) and should be used in every modern project

- Navigation routing like in a real SPA project

- The structure of the project is in modern "Feature-first" style.

- Automatic combining of the actions, types, selectors and reducers, which allows to have beauty imports without '../../../../../' hell. Also note that at the root there is a file .env with neccessary NODE_PATH=src/ variable for successfull compilation

- I like ReduxSauce, it provide a huge boost in code logic and testing possibilities. Every redux.js file uses this perfect lib.

- All asynchronous actions are handled by sagas, redux-thunk is not even installed.

- The api.js file completely reworked, the bug is described in api_mock.js. Emulation of server API is in the api_mock.js also.

- Every save operation is stored by api simulator to LocalStorage (server simulation, not local redux state, which also works in parallel), so page reload will not lead to data lose until browser cache is cleared.

- The phone validation is not trivial task and still do not have any universal solution for all countries. The most common patters are added to the validation function in utils.js.

- The code styling (.eslintrc) is the question of discussion and can be changed regarding your company requirements.

I have to eject the project from CRA to be able to prepare the test environment for Jest. Ejected project can be tuned much better and have more flexibility in setup.

I don't like the way your app loads it's assets - in case of offline state the app is completely broken. At startup browser should load 5 external files with full component palette, while 99% of them are not used. The better way is to use a technique like Material design or Onsen components use, to have all the necessary files in one bundle. This was not in the task description, so wasn't changed.

The styled components ( https://assets-cdn.shore.com/shore-components/master/current/index.html ) contain a lot of mistakes and should be fixed.

I forgot to tell you, that during all my previous projects the development process was always splitted in to 3 separate parts: design, mocks creation and programming. I am a programmer, and never made a CSS styling. I can easily identify the quality of CSS, but for me it is a hell to make them by myself, because I don't have a lot of practice in this part.
