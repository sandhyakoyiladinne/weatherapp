



// import React, { useState, useEffect } from 'react';
// import { auth, googleProvider, signInWithPopup } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import './Login.css';

// function Login() {
//   const [user] = useAuthState(auth);
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [localUser, setLocalUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setLocalUser(storedUser);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignUp) {
//       localStorage.setItem('user', JSON.stringify(formData));
//       setLocalUser(formData);
//       alert('Sign Up Successful!');
//     } else {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (
//         storedUser.email === formData.email &&
//         storedUser.password === formData.password
//       ) {
//         setLocalUser(storedUser);
//         alert('Sign In Successful!');
//       } else {
//         alert('Invalid email or password');
//       }
//     }
//   };

//   const handleLogout = () => {
//     setLocalUser(null);
//     localStorage.removeItem('user');
//     auth.signOut();
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error('Error signing in with Google', error);
//     }
//   };

//   return (
//     <div className="Login">
//       {localUser || user ? (
//         <div>
//           <h1>Welcome, {localUser?.name || user?.displayName}</h1>
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <form onSubmit={handleSubmit}>
//             {isSignUp && (
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
//           </form>
//           <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//           <button onClick={() => setIsSignUp(!isSignUp)}>
//             {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Login.css';

function Login() {
  const [user] = useAuthState(auth);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLocalUser(storedUser);
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setLocalUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (isSignUp) {
      try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        user.updateProfile({ displayName: name });
        setLocalUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        setLocalUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      setLocalUser(null);
      localStorage.removeItem('user');
    }).catch(error => {
      console.error('Error signing out:', error);
    });
  };

  if (user || localUser) {
    return (
      <div className="login-container">
        <h2>Welcome, {user?.displayName || localUser?.displayName || 'User'}</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </>
        )}
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="google-signin-button" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Login;
