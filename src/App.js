import React from 'react';
import Quiz from './components/quiz';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const App = () => {
  const router = createBrowserRouter([
		{
			path: '/',
			children: [
				{
					path: '/',
					element: <Home/>,
				},
        {
          path:'/quest',
          element: <Quiz/>
        }
			],
		},
		{
			path: 'auth',
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
			],
		},
	])
	return (
    <div className="main">
      <h1>Квіз — українські слова англійською</h1>
			<RouterProvider router={router} />
		</div>
	)
  // return (
  //   <div className="main">
  //     <h1>Квіз — українські слова англійською</h1>
  //     <Quiz />
  //   </div>
  // );
};

export default App;