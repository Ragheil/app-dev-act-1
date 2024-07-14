import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, StyleSheet, Switch, ImageBackground, Alert } from 'react-native';

const NoteInputModal = ({ darkMode, title, setTitle, content, setContent, handleSaveNote, handleDeleteNote, setModalVisible }) => {
  return (
    <ImageBackground
      source={darkMode ? require('./darkmode.jpg') : require('./lmode.jpg')}
      style={[styles.container, darkMode ? styles.darkMode : styles.lightMode]}
    >
      <View style={[styles.modalContainer, darkMode ? styles.darkMode : styles.lightMode]}>
        <TextInput
          style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
          placeholderTextColor={darkMode ? '#666' : '#999'}
          placeholder="Enter note title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.contentInput, darkMode ? styles.inputDark : styles.inputLight]}
          multiline
          placeholderTextColor={darkMode ? '#666' : '#999'}
          placeholder="Enter note content"
          value={content}
          onChangeText={setContent}
        />
        <View style={styles.buttonContainer}>
          {handleDeleteNote && (
            <Button title="Delete" onPress={handleDeleteNote} color="#FF2200" />
          )}
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="#8630FF" />
          <Button title="Save" onPress={handleSaveNote} color="#007BFF" />
        </View>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const noteTitleStyle = {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: darkMode ? '#FFFFFF' : '#68BFE5',
  };

  const textStyle = darkMode ? styles.textLight : styles.textDark;

  const handleSaveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      setSelectedNote(null);
      Alert.alert('Note Saved', 'Your note has been successfully updated.');
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes, newNote]);
      Alert.alert('Note Added', 'Your note has been successfully added.');
    }
    setTitle('');
    setContent('');
    setModalVisible(false);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const handleDeleteNote = (note) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedNotes = notes.filter((item) => item.id !== note.id);
            setNotes(updatedNotes);
            setSelectedNote(null);
            setModalVisible(false);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      source={darkMode ? require('./darkmode.jpg') : require('./lmode.jpg')}
      style={[styles.container, darkMode ? styles.darkMode : styles.lightMode]}
    >
      <Text style={[styles.title, textStyle]}>My Notes</Text>
      <ScrollView style={[styles.noteList, darkMode ? styles.darkMode : styles.lightMode]}>
        {notes.map((note) => (
          <TouchableOpacity key={note.id} onPress={() => handleEditNote(note)}>
            <Text style={[styles.noteTitle, noteTitleStyle, darkMode ? styles.textDark : null]}>{note.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        title="Add Note"
        color="#49706D"
        onPress={() => {
          setTitle('');
          setContent('');
          setModalVisible(true);
        }}
      />
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <NoteInputModal
          darkMode={darkMode}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSaveNote={handleSaveNote}
          handleDeleteNote={selectedNote ? () => handleDeleteNote(selectedNote) : null}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <View style={styles.darkModeToggle}>
        <Text style={[styles.modeText, textStyle]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 25,
  },
  noteList: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    height: 40,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#DD5252',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E36B6B',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  darkModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  modeText: {
    marginRight: 10,
    fontSize: 18,
  },
  textDark: {
    color: '#000',
  },
  textLight: {
    color: '#fff',
  },
  inputDark: {
    borderWidth: 1,
    borderColor: '#E7BABA',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#fff', // Text color
    borderWidth: 3,
  },
  inputLight: {
    borderWidth: 1,
    borderColor: '#F67676',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000', // Text color
    borderWidth: 3,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
