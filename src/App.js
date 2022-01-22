import {Wrap , WrapItem , Badge , Box , Avatar , Button , Alert , toast , AlertIcon , HStack , Heading , Text , Divider , Container , FormControl , Select, Center } from '@chakra-ui/react';
import {useEffect , useState} from 'react';
import './App.css';

const App = () => {
  {const [data , setData] = useState([]);
  const [rawdata , setRawdata] = useState([]);
  const [ischange , setChange] = useState(false);
  useEffect(() => {
    getTable();
  })
  
  const CreateUrl = (key, gql) => {
    let gq = 'SELECT '+ gql;
    let encodedgg = encodeURIComponent(gq);
    let url = 'https://docs.google.com/spreadsheets/d/' + key + '/gviz/tq?tq=' + encodedgg;
    return url;
  };
  
  const preview = (url) => {
    fetch(url).then(data => data.text()).then(function(response) {
      var responseText = response.substring(response.indexOf("(") + 1, response.lastIndexOf(")"));
      var response = JSON.parse(responseText);
      
      response = response['table']['rows'];
      let fdata = [];
      
      for(let i=0 ; i<response.length ; i++){
        if(response[i]['c'][1]['v']==='-'){
          response[i]['c'][1]['v'] = 'Anonymous';
        }

        if(response[i]['c'][4]['v']===null){
          response[i]['c'][4]['v'] = 'ยังไม่มีคำตอบ';
        }

        let s = "";
        for(let j=0 ; j<response[i]['c'][3]['v'].length ; j++){
          if(response[i]['c'][3]['v'][j]===','){
            s += '","'
            j++;
          }else{
            s += response[i]['c'][3]['v'][j];
          }
        }

        s = JSON.parse('["' + s + '"]');
        fdata.push({
          "date" : response[i]['c'][0]['f'],
          "author" : response[i]['c'][1]['v'],
          "question" : response[i]['c'][2]['v'],
          "tags" : s,
          "answer" : response[i]['c'][4]['v']
        });
      }

      if(fdata.length!==data.length && !ischange){
        setData(fdata);
        setChange(true);
        setRawdata(fdata);
        console.log(fdata);
      }
    });
  };
  
  
  const getTable = () => {
    let gsKey = '1Ga5LqToH5gC10Phmp2N_Q5qnapWHVL3JYmcJYT4v4Kc';
    let gql = `*`;
    let url = CreateUrl(gsKey, gql);
    preview(url);
  };

  const getValue = (e) => {
    e.preventDefault();
    console.log(e.target.a.value);
    let fdata = [];
    for(let i=0 ; i<rawdata.length ; i++){
      let found = false;
      for(let j=0 ; j<rawdata[i]['tags'].length ; j++){
        if(e.target.a.value===rawdata[i]['tags'][j] || e.target.a.value==='')found=true;
      }
      if(found) fdata.push(rawdata[i]);
    }
    setData(fdata);
  };

  return (
    <div className="App">
      <Container className="container-box" maxW='container.lg'>
      <Heading>Q&A : Thailand Upper Southern Computing Olympiad</Heading>
      <Text mt={3}>ส่งคำถามมาได้ที่ : <Badge colorScheme="pink"><a target='_blank' href="https://forms.gle/SNeQzmrYAnF7WWbB8" color='purple'>Q&A Form !!!</a></Badge></Text>
      <form onSubmit={getValue}>
        <HStack spacing='24px' mt={5}>
        <Select placeholder='--Select tags--' className="select-box" name="a">
          <option value="Mathematics">Mathematics</option>
          <option value="Basic Programming">Basic Programming</option>
          <option value="Time Complexity">Time Complexity</option>
          <option value="Recursion">Recursion</option>
          <option value="Data Structure">Data Structure</option>
          <option value="Greedy Algorithm">Greedy Algorithms</option>
          <option value="State Space Search">State Space Search</option>
        </Select>
        <Button type="submit" colorScheme='purple'>Search</Button>
        </HStack>
      </form>
      <Wrap spacing='30px' mt={3}>
        {data.map(element => {
          let date = element['date'];
          let author = element['author'];
          let question = element['question'];
          let tags = element['tags'];
          let answer = element['answer'];

          return (
            <WrapItem>
              <Box p={4} maxH='300px' w='300px' borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' bg='white' className="blog-box">
                <Heading size='sm' mb={3}>{question}</Heading>
                <Divider mb={3}/>
                <Wrap>
                  <HStack className="tags-box">
                      {tags.map(tag =>{
                        return (
                          <WrapItem>
                            <Badge colorScheme='purple'>{tag}</Badge>
                          </WrapItem>
                        )
                      })}
                  </HStack>
                </Wrap>
                <Text mt={3} mb={3} className="answer-box-">
                  <div className="answer-box">
                  {answer}
                  </div>
                </Text>
                <Text color='gray.400' size='xs'>
                  {date} โดย {author}
                </Text>
              </Box>
            </WrapItem>
          )
        })}
      </Wrap>
      </Container>
    </div>
  );
}}

export default App;
