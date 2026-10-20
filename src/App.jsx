// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Layout from "./Layout";

// // import Home from "./Pages/Home";
// // import Services from "./Pages/Services";
// // import Gallery from "./Pages/Gallery";
// // import About from "./Pages/About";
// // import Blog from "./Pages/Blog";
// // import Contact from "./Pages/Contact";
// // import Login from "./Pages/Login";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route element={<Layout />}>

// //           <Route path="/" element={<Home />} />
// //           <Route path="/services" element={<Services />} />
// //           <Route path="/gallery" element={<Gallery />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/blog" element={<Blog />} />
// //           <Route path="/contact" element={<Contact />} />
// //           <Route path="/login" element={<Login />} />

// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";

// import Home from "./Pages/Home";
// import Services from "./Pages/Services";
// import Gallery from "./Pages/Gallery";
// import About from "./Pages/About";
// import Blog from "./Pages/Blog";
// import Contact from "./Pages/Contact";
// import Login from "./Pages/Login";
// import Id from "./Component/Id"; 


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/id" element={<Id />} />  
          
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Gallery from "./Pages/Gallery";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Id from "./Component/Id";
import Admin from "./Component/Admin";   // ← naya add

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== Layout wale routes (navbar + footer ke saath) ===== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/id" element={<Id />} />
        </Route>

        {/* ===== Admin route (Layout ke BAHAR - navbar nahi dikhega) ===== */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;