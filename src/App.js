// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom";

//////////////////
// Style Object
//////////////////
const h1 = {
  textAlign: "center",
  margin: "10px",
  color: "#606c76"
};

const button = {
  display: "block",
  margin: "auto"
}

function App() {

  /////////////////////////////
  // State and Other Variables
  /////////////////////////////

  const navigate = useNavigate()

  const url = "https://capstone-backend-tailwindcss.herokuapp.com/quotes/"

  // State to hold list of quotes
  const [posts, setPosts] = useState([])

  // an empty quote for initializing the create form
  const nullQuote = {
    subject: ""
  }

  const [targetQuote, setTargetQuote] = useState(nullQuote)

   //////////////
  // Functions
  //////////////

  // function to get list of quotes from API
  const getQuotes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // function to add quotes
  const addQuotes = async (newQuote) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuote)
    });

    getQuotes()
  }

  // to select a quote to edit
  const getTargetQuote = (quote) => {
    setTargetQuote(quote);
    navigate("/edit");
  };

  // update quote for our handlesubmit prop
  const updateQuote = async (quote) => {
    await fetch(url + quote.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    // update our quotes
    getQuotes();
  };

  const deleteQuote = async (quote) => {
    await fetch(url + quote.id, {
      method: "delete"
    })

    getQuotes()
    navigate("/")
  }

  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getQuotes()
  }, [])

  /////////////////
  // Returned JSX
  /////////////////

  return (
    <div className="App">
      <nav className="w-full bg-yellow-400 py-4">
      <Link to="/">
        <h1 className="text-center text-7xl font-bold" style={h1}>12 Rules for Not Life</h1>
      </Link>
      </nav>
      <Link color="lightBlue"
            buttonType="outline"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
            to="/new">
      <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300" style={button}>Create New Quote</button>
      </Link>
      <div className="p-20 bg-blue-100 bg-blue p-6 rounded-lg shadow-lg">
      <Routes>
      <Route  path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost 
        posts={posts}
        edit={getTargetQuote}
        deleteQuote={deleteQuote}
        />}/>
        <Route path="/new" element={<Form
          initialQuote={nullQuote}
          handleSubmit={addQuotes}
          buttonLabel="Create Quote"
        />}/>
        <Route path="/edit" element={<Form
          initialQuote={targetQuote}
          handleSubmit={updateQuote}
          buttonLabel="Update Quote"
        />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;