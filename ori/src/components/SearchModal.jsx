import React from 'react';
import './search.css'; // Import the modal styles
import {  Box, Button} from '@chakra-ui/react';

const SearchModal = ({searchResults, handleClear, setShowSuggestions }) => {
  return (
    <Box className="dropdown" position={'absolute'}  top= '90%' left= {{lg:'34%',md:'31%',base:'25%'}} >
          {searchResults
                  .map((item,i) => (
              <div             
                className="dropdown-row"
                key={i}
              >
                {item}
              </div>
            ))}
            <Button onClick={handleClear}  ml={{lg:'80%',md:'50%'}} w={{lg:'10vh',md:'50%',base:'30%'}}  fontSize={{md:'16px',base:'12px'}} bgColor={'red'} onBlur={() => {setShowSuggestions(false);console.log('blur')}}>Clear</Button>
        </Box>
      
  );
};

export default SearchModal;
