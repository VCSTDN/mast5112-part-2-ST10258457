import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

function Input({ title, onValueChange, value, error }) {
  return (
    <View style={styles.container}>
      {/* Input title */}
      <Text style={styles.title}>{title}</Text>

      {/* Input */}
      <TextInput 
        style={styles.input}
        onChangeText={onValueChange}
        value={value}
      />

      {/* Error message */}
      {(error != "") && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 45,
  },
  title: {
    fontSize: 23,
    color: '#000000',
  },
  input: {
    height: 42,
    borderBottomWidth: 1,
    fontSize: 20,
    paddingVertical: 0,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
});

export default Input;