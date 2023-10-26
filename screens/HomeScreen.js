import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

function HomeScreen({ navigation }) {

  const [lastBookRead, setLastBookRead] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [averagePages, setAveragePages] = useState(0);
  
  // retrieve last book read info and calculate total & average pages
  const retrieveData = async () => {
    let tempLastBookRead = await AsyncStorage.getItem('@last_book_read'); // get last book read

    // if there is last book read info then convert string to a JavaScript object
    if (tempLastBookRead != null) {
      tempLastBookRead = JSON.parse(tempLastBookRead);
    }

    setLastBookRead(tempLastBookRead);

    const tempTotalPages = await AsyncStorage.getItem('@total_pages') ?? 0;
    const tempTotalBooks = await AsyncStorage.getItem('@total_books') ?? 1; // default 1 due to division by zero error

    setTotalPages(tempTotalPages);

    // calculate average pages read
    const tempAveragePages = Number(tempTotalPages) / Number(tempTotalBooks);
    setAveragePages(tempAveragePages);
  };

  // similar to useEffect but runs each time the screen becomes focused
  // https://reactnavigation.org/docs/function-after-focusing-screen#triggering-an-action-with-the-usefocuseffect-hook
  useFocusEffect(
    useCallback(() => {
      retrieveData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Home screen content */}
      <View style={styles.home_screen}>

        {/* App branding */}
        <View style={styles.branding}>
          <Image source={require('./../assets/icons/Logo.png')} />
          <Text style={styles.app_name}>Book Space</Text>
        </View>

        {/* Last book read section */}
        <View style={styles.section}>
          <Text style={styles.section_title}>Recent</Text>
          <View style={styles.divider} />

          {/* Last book read information */}
          {(lastBookRead ? (
            <View style={styles.card}>
              <View style={styles.book_info}>
                <Text style={styles.book_title}>{lastBookRead.title}</Text>
                <Text style={styles.book_author}>{lastBookRead.author}</Text>
                <View style={styles.genre_card}>
                  <Text style={styles.book_genre}>{lastBookRead.genre}</Text>
                </View>
              </View>
              <View style={styles.page_info}>
                <Image 
                  source={require('./../assets/icons/Page.png')} 
                  style={styles.icon}
                />
                <Text style={styles.page_count}>
                  {lastBookRead.pages}{'\n'}Pages
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.empty_state}>
              <Image 
                source={require('./../assets/icons/History.png')} 
                style={styles.empty_icon}
              />
              <Text style={styles.empty_text}>No books read yet</Text>
            </View>
          ))}
        </View>

        {/* Total & average pages read section */}
        <View style={styles.section}>
          <Text style={styles.section_title}>Stats</Text>
          <View style={styles.divider} />

          {/* Total pages read */}
          <View style={styles.card}>
            <Image 
              source={require('./../assets/icons/Stats.png')} 
              style={styles.icon}
            />
            <Text style={styles.stats_text}>
              <Text style={styles.bold_text}>{totalPages} </Text> 
              Total Pages Read
            </Text>
          </View>

          {/* Average pages read */}
          <View style={styles.card}>
            <Image 
              source={require('./../assets/icons/Stats.png')} 
              style={styles.icon}
            />
            <Text style={styles.stats_text}>
              <Text style={styles.bold_text}>{averagePages} </Text> 
              Average Pages Read
            </Text>
          </View>
        </View>

        {/* Add book FAB (Floating Action Button) */}
        <View style={styles.fab_container}>
          <TouchableOpacity onPress={() => navigation.navigate('EnterBook')}>
            <View style={styles.fab}>
              <Text style={styles.fab_text}>+ Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <View style={styles.navigation_buttons}>

          {/* Home Button */}
          <View style={styles.button}>
            <Image 
              source={require('./../assets/icons/Home_Active.png')} 
              style={styles.icon}
            />
            <Text style={styles.button_text_active}>Home</Text>
          </View>

          {/* History Button */}
          <View style={styles.button}>
            <Image 
              source={require('./../assets/icons/History.png')} 
              style={styles.icon}
            />
            <Text style={styles.button_text}>History</Text>
          </View>

          {/* Genre Button */}
          <View style={styles.button}>
            <Image 
              source={require('./../assets/icons/Genre.png')} 
              style={styles.icon}
            />
            <Text style={styles.button_text}>Genre</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  home_screen: {
    flex: 1,
    padding: 30,
  },

  /* App branding */
  branding: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  app_name: {
    flex: 1,
    fontFamily: 'Inter Medium',
    fontSize: 30,
    fontWeight: '600',
    textAlignVertical: 'center',
    color: '#006782',
  },

  /* Sections */
  section: {
    marginTop: 40,
  },
  section_title: {
    fontFamily: 'Inter',
    fontSize: 30,
    color: '#000000',
  },
  divider: {
    backgroundColor: '#000000',
    height: 2,
    width: 40,
    marginTop: 3,
  },
  card: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    padding: 25,
    borderWidth: 1,
    borderColor: '#c5c5c5',
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center',
  },

  /* Last book read information */
  book_info: {
    flex: 1,
  },
  page_info: {
    width: 100,
  },
  book_title: {
    fontFamily: 'Inter',
    fontSize: 28,
    color: '#000000',
  },
  book_author: {
    fontFamily: 'Inter',
    fontStyle: 'italic',
    fontSize: 22,
    color: '#323232',
  },
  genre_card: {
    marginTop: 30,
    backgroundColor: '#006782',
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  book_genre: {
    fontFamily: 'Inter',
    fontSize: 20,
    alignSelf: 'flex-start',
    color: '#ffffff',
  },
  page_count: {
    fontFamily: 'Inter',
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
    marginTop: 10,
    fontStyle: 'italic',
  },

  /* Empty last book read */
  empty_state: {
    marginTop: 25,
    height: 200,
    paddingTop: 65,
  },
  empty_icon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  empty_text: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 28,
    color: '#2d2d2d',
  },

  /* Total & average pages read */
  stats_text: {
    fontFamily: 'Inter',
    textAlignVertical: 'center',
    fontSize: 24,
    color: '#2d2d2d',
    marginLeft: 20,
  },
  bold_text: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#006782',
  },

  /* Add book FAB (Floating Action Button) */
  fab_container: {
    backgroundColor: '#006782',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    elevation: 13,
    marginTop: 30,
    borderRadius: 14,
  },
  fab: {
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  fab_text: {
    fontFamily: 'Inter',
    color: '#ffffff',
    fontSize: 28,
  },

  /* Bottom navigation */
  navigation: {
    height: 100,
    shadowColor: '#000',
    elevation: 40,
    borderTopColor: '#efefef',
    borderTopWidth: 1,
  },
  navigation_buttons: {
    backgroundColor: '#ffffff',
    flex: 1,
    shadowColor: '#000',
    elevation: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  button: {
    flex: 1,
    width: 150,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 20,
  },
  button_text_active: {
    color: '#006782',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;