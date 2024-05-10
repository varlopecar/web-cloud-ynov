import { Timestamp } from '@firebase/firestore';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CommentProps {
  text: string;
  createdBy: string;
  date: Timestamp | Date | any;
}

const CommentComponent = ({ text, createdBy, date } : CommentProps) => {
  // Check if the date has the toDate method, indicating it's a Firestore Timestamp
  const displayDate = date?.toDate ? date.toDate().toLocaleString() : "Invalid date";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.meta}>{createdBy} - {displayDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  }
});

export default CommentComponent;
