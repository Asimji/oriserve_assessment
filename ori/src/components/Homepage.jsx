import { Box, Button, Flex, Grid, Heading, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce'
import SearchModal from './SearchModal';

const apiKey = '4c048c2707f265505905a851bb4b4e8f';
const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1`;
const perPage = 20; 
const Homepage = () => {
    const [photos,setPhotos]=useState([]);
    const [query,setQuery]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [page, setPage] = useState(20);
    const [searchHistory,setSearchHistory]=useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  

  

    // fetching Images First Time
    useEffect(()=>{
         fetch(`${apiUrl}&per_page=${perPage}`).then(res=>res.json()).then(res=>{setPhotos(res.photos.photo)}).catch(e=>console.log(e))
    },[])

 
    // Search Function Debounce Technique 
    const debounceSearch=debounce((query)=>{
      fetch(`${apiUrl}&text=${query}&per_page=${page}`).then(res=>res.json()).then(res=>{setSearchResult(res.photos.photo)}).catch(e=>console.log(e))
    },300)

 
    // Input Change Method 
const handleChange=(e)=>{
    setQuery(e.target.value);
}
const handleSubmit=()=>{
  setSearchHistory((prev) => {
    const updatedSearchHistory = [...prev, query];
    console.log(query)
    localStorage.setItem('searchDetail', JSON.stringify(updatedSearchHistory));
    return updatedSearchHistory;
  });


  debounceSearch(query)
}

// Fetching Search History From LocalStorage

useEffect(() => {
  const savedSearchHistory = JSON.parse(localStorage.getItem('searchDetail'));
  if (savedSearchHistory) {
    setSearchHistory(savedSearchHistory);
  }

}, []);



// For Infinite Scroll
const handleScroll=()=>{
  if(window.innerHeight + document.documentElement.scrollTop===document.documentElement.offsetHeight){
      setPage((prev)=>prev+20); 
      debounceSearch(query);
  }
}

useEffect(()=>{
  window.addEventListener('scroll',handleScroll)
  return ()=> window.removeEventListener('scroll',handleScroll)
})




const handleClear=()=>{
  console.log("Clear")
 localStorage.removeItem('searchDetail')
 setSearchHistory([])
 setShowSuggestions(false)
}

    return (
    <Box>
       <Flex direction={'column'} alignItems={'center'} justify={'center'} bgColor={'black'} textColor={'#ffff'} p={'3vh'} position={'relative'}>
           <Heading>Search Photos</Heading>
           <Flex alignItems={'center'} gap={'2vh'}>

           <Input  placeholder='search' w={'25vw'} mt={'2vh'} onChange={(e)=>handleChange(e)}
            onClick={() => setShowSuggestions(true)}
            
            />
            <Button onClick={handleSubmit} mt={'2vh'}>Search</Button>
            </Flex>
              {showSuggestions && searchHistory.length>0 && (
     <SearchModal  searchResults={searchHistory} handleClear={handleClear} setShowSuggestions={setShowSuggestions}  />
    )} 
   

   
    
    
       </Flex>

       <Grid templateColumns={{lg:'repeat(4,1fr)',base:'repeat(2,1fr)'}} gap={'2vh'} mt={'2vh'} p={'2vh'}

       >
        
        
        { searchResult.length>0 ? searchResult?.map((item)=>{
            return <Box w={'100%'}> <Image
            key={item.id}
            src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}
            alt={item.title}
            w={'100%'}
            /></Box>
        }) : photos?.map((item)=>{
          return <Box w={'80%'}  key={item.id}>
           <Image
          src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}
          alt={item.title}
          w='100%'
          />
          </Box>
        })
        }
       </Grid>
    </Box>
  )
}

export default Homepage
