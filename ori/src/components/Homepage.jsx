import { Box, Flex, Grid, Heading, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const apiKey = '4c048c2707f265505905a851bb4b4e8f';
const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1`;

const Homepage = () => {
    const [photos,setPhotos]=useState([])
    const [query,setQuery]=useState("")
    useEffect(()=>{
         fetch(`${apiUrl}`).then(res=>res.json()).then(res=>{setPhotos(res.photos.photo)}).catch(e=>console.log(e))
    },[])
    
 
  return (
    <Box>
       <Flex direction={'column'} alignItems={'center'} justify={'center'} bgColor={'black'} textColor={'#ffff'} p={'3vh'}>
           <Heading>Search Photos</Heading>
           <Input placeholder='search' w={'25vw'} mt={'2vh'} onChange={(e)=>setQuery(e.target.value)}/>
       </Flex>

       <Grid templateColumns={'repeat(8,1fr)'} gap={'2vh'} mt={'2vh'}>
        
        
        {photos?.map((item)=>{
          return <Box>
           <Image
          key={item.id}
          src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}
          alt={item.title}
          />
          </Box>
        })}
       </Grid>
    </Box>
  )
}

export default Homepage
