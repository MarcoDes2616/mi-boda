import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import color from "../../constants/color";

const SupplierCard = ({ supplier, onEdit, onDelete, handleAddComment, setComment, comment }) => {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <View style={styles.card}>
      {/* Sección de información principal */}
      <View style={styles.header}>
        <Text style={styles.name}>{supplier?.full_name}</Text>
        <View style={styles.requirementSection}>
          <FontAwesome name="tasks" size={16} color="#121212" />
          <Text style={styles.requirement}>
            {supplier.requirement?.requirement || 'No requirement'}
          </Text>
        </View>
      </View>
      
      {/* Sección de contacto */}
      <View style={styles.contactSection}>
        <View style={styles.row}>
          <View style={styles.contactInfo}>
            <FontAwesome name="phone" size={20} color={color.oliveGreen} />
            <Text style={styles.detail}>{supplier?.phone || 'Sin teléfono'}</Text>
          </View>
          <TouchableOpacity onPress={() => {/* Acción de WhatsApp */}}>
            <FontAwesome name="whatsapp" size={24} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.contactInfo}>
            <FontAwesome name="money" size={20} color={color.oliveGreen} />
            <Text style={styles.detail}>Precio: ${supplier.requirement?.price || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Botón para desplegar sección de comentarios */}
      <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.commentsToggle}>
        <FontAwesome name="comment" size={24} color={color.wine} />
        <Text style={styles.toggleText}>Comentarios</Text>
      </TouchableOpacity>

      {/* Sección de comentarios expandible */}
      {showComments && (
        <View style={styles.commentsSection}>
          <View style={styles.commentsList}>
            {supplier.comments.map((note, index) => (
              <Text key={index} style={styles.comment}>
                [{new Date(note.createdAt).toLocaleDateString()}] {note.comment}
              </Text>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Agregar un comentario..."
            value={comment}
            onChangeText={setComment}
          />
          <Button title="Agregar comentario" onPress={() => handleAddComment(supplier.id)} color={color.sageGreen} />
        </View>
      )}

      {/* Sección de acciones */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onEdit(supplier?.id)} style={styles.editButton}>
          <FontAwesome name="edit" size={24} color={color.wine} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(supplier?.id)} style={styles.trash}>
          <FontAwesome name="trash" size={24} color={color.sageGreen} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos previos para la tarjeta
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  requirementSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirement: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  contactSection: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    fontSize: 16,
    color: '#666',
  },
  commentsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 16,
    color: color.wine,
  },
  commentsSection: {
    marginTop: 10,
  },
  commentsList: {
    marginBottom: 10,
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  editButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F3E5F5',
  },
  trash: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FCE4EC',
  },
});

export default SupplierCard;

  
  