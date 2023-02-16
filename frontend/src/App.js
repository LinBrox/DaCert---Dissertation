import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LandingPage from './screens/LandingPage/LandingPage'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import CreateCert from './screens/CreateCert/createCert'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom'
import DashBoard from './screens/DashBoard/MyCerts'
import SingleCert from './screens/SingleCert/SingleCert'
import { useState } from 'react'


const App = () => {
  const [search, setSearch] = useState("")
  console.log(search)

  return (
  <Router>
    <Header setSearch={setSearch}/>
    <Routes>
      <Route path="/" element={<LandingPage />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/createcert" element={<CreateCert />} />
      <Route path="/certs/:id" element={<SingleCert />} />
      <Route path="/certs" element={<DashBoard search={search} />} />
    </Routes>
    <Footer />
  </Router>
)}

export default App
