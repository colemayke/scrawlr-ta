# upvote counter

react app for managing multiple upvote lists. each list can have its own set of upvotes that toggle between selected and unselected states.

author: Cole Mayke  
date: November 17, 2025

## how it works

the app is built with react and typescript. state is managed through react context, and everything persists to localStorage so your data stays around after refresh.

### components

Upvote (`src/components/Upvote/Upvote.tsx`)
- basic upvote button component
- shows an arrow icon that changes color based on selected state
- gray background with dark gray arrow when unselected
- blue background with blue arrow when selected
- clicking it calls the `onUpvote` handler passed down from the parent

UpvoteList (`src/components/UpvoteList/UpvoteList.tsx`)
- displays a list of upvotes plus an add button
- all upvotes in a list share the same selection state
- when you click any upvote in the list, all of them toggle together
- the add button increments the count for that specific list
- each list is independent; toggling one doesn't affect the others

PageLayout (`src/components/Layout/PageLayout.tsx`)
- main page component that renders all the lists
- pulls the lists from context and maps over them
- passes down the toggle and add handlers to each list

### state management

UpvoteProvider (`src/context/UpvoteProvider.tsx`)
- context provider that holds all the upvote lists in state
- manages a few operations:
  - `toggleList(id)` - flips the selected state for a specific list
  - `addUpvote(id)` - adds one more upvote to a list
  - automatically saves to localStorage whenever state changes
- loads from localStorage on mount, falls back to default lists if nothing's stored

useUpvoteLists (`src/hooks/useUpvoteLists.ts`)
- custom hook to access the context
- just wraps useContext and throws an error if you try to use it outside the provider
- makes it easier to get the lists and handlers without having to import the context directly

### data persistence

storage.ts (`src/utils/storage.ts`)
- handles reading and writing to localStorage
- `loadLists()` - tries to parse what's in localStorage, returns null if nothing there or if parsing fails
- `saveLists()` - writes the current lists to localStorage
- both functions check if we're in a browser environment first (for ssr safety)

### how everything fits together

1. `App.tsx` wraps everything in `UpvoteProvider` so the context is available everywhere

2. `PageLayout` uses the `useUpvoteLists` hook to get the lists and handlers from context

3. for each list, it renders an `UpvoteList` component and passes:
  - the list data (id, label, count, selected state)
  - a toggle handler that calls `toggleList` with that list's id
  - an add handler that calls `addUpvote` with that list's id

4. `UpvoteList` renders multiple `Upvote` components based on the count, all sharing the same `selected` prop

5. when you click an upvote, it calls `onUpvote` which triggers `toggleList` in the provider

6. `toggleList` updates the state for just that list, which causes a re-render

7. the provider's useEffect watches the lists state and saves to localStorage whenever it changes

8. on page refresh, the provider loads from localStorage in the initial state, so everything comes back

the key thing is that each list maintains its own `selected` boolean, so they can be toggled independently. clicking an upvote in list 1 only affects list 1, not the others.

## running it

```bash
npm install
npm start
```

runs on `http://localhost:3000`

## testing

```bash
npm test
```

also there's a test for the Upvote component that checks the toggle behavior works correctly.
