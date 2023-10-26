import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  View,
	Text,
  TouchableOpacity,
  Image,
	StyleSheet
} from 'react-native';

// components
import Input from '../components/input';

// predefined genre list
const genreList = [
  {id: '1', name: 'Action and adventure', count: 0},
  {id: '2', name: 'Alternate history', count: 0},
  {id: '3', name: 'Anthology', count: 0},
  {id: '4', name: 'Chick lit', count: 0},
  {id: '5', name: 'Children', count: 0},
  {id: '6', name: 'Classic', count: 0},
  {id: '7', name: 'Comic book', count: 0},
  {id: '8', name: 'Coming-of-age', count: 0},
  {id: '9', name: 'Crime', count: 0},
  {id: '10', name: 'Drama', count: 0},
  {id: '11', name: 'Fairytale', count: 0},
  {id: '12', name: 'Fantasy', count: 0},
  {id: '13', name: 'Graphic novel', count: 0},
  {id: '14', name: 'Historical fiction', count: 0},
  {id: '15', name: 'Horror', count: 0},
  {id: '16', name: 'Mystery', count: 0},
  {id: '17', name: 'Paranormal romance', count: 0},
  {id: '18', name: 'Picture book', count: 0},
  {id: '19', name: 'Poetry', count: 0},
  {id: '20', name: 'Political thriller', count: 0},
  {id: '21', name: 'Romance', count: 0},
  {id: '22', name: 'Satire', count: 0},
  {id: '23', name: 'Science fiction', count: 0},
  {id: '24', name: 'Short story', count: 0},
  {id: '25', name: 'Suspense', count: 0},
  {id: '26', name: 'Thriller', count: 0},
  {id: '27', name: 'Western', count: 0},
  {id: '28', name: 'Young adult', count: 0},
  {id: '29', name: 'Art/architecture', count: 0},
  {id: '30', name: 'Autobiography', count: 0},
  {id: '31', name: 'Biography', count: 0},
  {id: '32', name: 'Business/economics', count: 0},
  {id: '33', name: 'Crafts/hobbies', count: 0},
  {id: '34', name: 'Cookbook', count: 0},
  {id: '35', name: 'Diary', count: 0},
  {id: '36', name: 'Dictionary', count: 0},
  {id: '37', name: 'Encyclopedia', count: 0},
  {id: '38', name: 'Guide', count: 0},
  {id: '39', name: 'Health/fitness', count: 0},
  {id: '40', name: 'History', count: 0},
  {id: '41', name: 'Home and garden', count: 0},
  {id: '42', name: 'Humor', count: 0},
  {id: '43', name: 'Journal', count: 0},
  {id: '44', name: 'Math', count: 0},
  {id: '45', name: 'Memoir', count: 0},
  {id: '46', name: 'Philosophy', count: 0},
  {id: '47', name: 'Prayer', count: 0},
  {id: '48', name: 'Religion, spirituality, and new age', count: 0},
  {id: '49', name: 'Textbook', count: 0},
  {id: '50', name: 'True crime', count: 0},
  {id: '51', name: 'Review', count: 0},
  {id: '52', name: 'Science', count: 0},
  {id: '53', name: 'Self help', count: 0},
  {id: '54', name: 'Sports and leisure', count: 0},
  {id: '55', name: 'Travel', count: 0},
  {id: '56', name: 'True crime', count: 0}
]; 

function EnterBookScreen({ navigation }) {

  // input values
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(genreList[0].name); // default to first genre for picker
  const [pages, setPages] = useState("");

  // input errors
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [pagesError, setPagesError] = useState("");

  const validateInputs = () => {
    // reset error messages
    setTitleError("");
    setAuthorError("");
    setPagesError("");

    let inputsValid = true;

    // check if the title field is an empty string
    if (title.trim() == "") {
      inputsValid = false;
      setTitleError("Title field is required");
    }

    // check if the author field is an empty string
    if (author.trim() == "") {
      inputsValid = false;
      setAuthorError("Author field is required");
    }

    // check if the pages field is an empty string or not a valid number (NaN)
    if (pages.trim() == "" || Number(pages) == NaN) {
      inputsValid = false;
      setPagesError("Pages field is not a valid number");
    }

    return inputsValid;
  };

  const addBook = async () => {

    // if all the inputs are valid continue on to save book info
    if (validateInputs()) {

      // retrieve previous page and book count
      const totalPages = await AsyncStorage.getItem('@total_pages') ?? 0;
      const totalBooks = await AsyncStorage.getItem('@total_books') ?? 0;
  
      // accumulate page count and increment book count
      await AsyncStorage.setItem('@total_pages', (Number(totalPages) + Number(pages)).toString());
      await AsyncStorage.setItem('@total_books', (Number(totalBooks) + 1).toString());
  
      // convert JavaScript object to string
      const newBook = JSON.stringify({
        title: title,
        author: author,
        genre: genre,
        pages: pages
      });
      await AsyncStorage.setItem('@last_book_read', newBook);
  
      // return to home screen
      navigation.goBack();
    }
  };

	return (
		<View style={styles.container}>

      {/* Heading */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.back_button}>
            <Image 
              source={require('./../assets/icons/Back.png')} 
              style={styles.back_icon}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.header_text}>Add new book</Text>
      </View>

      {/* Inputs */}
      <Input 
        title="Title"
        onValueChange={setTitle}
        value={title}
        error={titleError}
      />

      <Input 
        title="Author"
        onValueChange={setAuthor}
        value={author}
        error={authorError}
      />

      {/* Genre picker */}
      <View style={styles.picker_container}>
        <Text style={styles.picker_title}>Genre</Text>
        <Picker
          selectedValue={genre}
          onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
          mode="dropdown"
        >
          {genreList.map(genre => <Picker.Item key={genre.id} label={genre.name} value={genre.name}/>)}
        </Picker>
      </View>

      <Input 
        title="Pages"
        onValueChange={setPages}
        value={pages}
        error={pagesError}
      />

      {/* Add book button */}
      <TouchableOpacity onPress={addBook}>
        <View style={styles.add_btn}>
          <Text style={styles.add_text}>Add</Text>
        </View>
      </TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
  },

  // heading
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 60,
  },
  back_button: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  back_icon: {
    alignSelf: 'center',
    marginTop: 8,
  },
  header_text: {
    textAlignVertical: 'center',
    fontFamily: 'Inter Medium',
    fontSize: 30,
    fontWeight: '600',
    color: '#000000'
  },

  // picker
  picker_container: {
    marginBottom: 45,
    borderBottomWidth: 1,
  },
  picker_title: {
    fontSize: 23,
    color: '#000000',
  },

  // add book button
  add_btn: {
    marginTop: 100,
    backgroundColor: '#006782',
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 14,
  },
  add_text: {
    fontFamily: 'Inter',
    color: '#ffffff',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default EnterBookScreen;