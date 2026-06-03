// screens/Support.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import TouchBtn from 'components/touchBtn';
import Dropdown from 'components/dropDown';
import { Ionicons } from '@expo/vector-icons';
import { createSupportTicket } from 'api/userProfile';
import { getUser } from 'config/storage';

const TICKET_CATEGORY_OPTIONS = [
  { label: 'Account Dispute', value: 'Account_Dispute' },
  { label: 'Transaction Dispute', value: 'Transaction_Dispute' },
  { label: 'Fraud Reporting', value: 'Fraud_Reporting' },
  { label: 'General Enquiry', value: 'General_Enquiry' },
];

export default function Support() {
  const [ticketCategory, setTicketCategory] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageMimeType, setImageMimeType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUserPhone() {
      const user = await getUser();
      if (user?.mobilePhone) {
        setPhoneNumber(user.mobilePhone);
      }
      if (user?.firstName || user?.lastName) {
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
        setUserName(fullName);
      }
    }
    loadUserPhone();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const clearForm = () => {
    setTicketCategory('');
    setComment('');
    setImageUri('');
    setImageBase64('');
    setImageMimeType('');
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: 'Please allow access to your media library.',
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];
      const extension = asset.uri.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const mimeType = extension === 'png' ? 'image/png' : 'image/jpeg';

      setImageUri(asset.uri);
      setImageBase64(asset.base64 ?? '');
      setImageMimeType(mimeType);
    }
  };

  const handleRemoveImage = () => {
    setImageUri('');
    setImageBase64('');
    setImageMimeType('');
  };

  const handleSubmit = async () => {
    if (!ticketCategory || !comment) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all required fields.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = imageBase64 ? imageBase64 : '';

      const payload = {
        ticketCategory,
        comment,
        phoneNumber,
        imageUrl,
      };

      const result = await createSupportTicket(null, payload);

      if (result.ok) {
        Toast.show({
          type: 'success',
          text1: 'Ticket Submitted',
          text2: 'We will get back to you as soon as possible.',
        });
        clearForm();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Submission Failed',
          text2: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: error?.message || 'Could not submit ticket. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        <Header title="Support" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

        {/* Profile Section */}
        <View className="items-center px-5 py-6">
          {/* Avatar with initials or fallback icon */}
          <View
            className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-[#157196] items-center justify-center">
            {userName ? (
              <Text style={{ fontSize: 32, fontWeight: '700', color: '#fff' }}>
                {getInitials(userName)}
              </Text>
            ) : (
              <Ionicons name="person" size={44} color="#fff" />
            )}
          </View>

          <Text className="mb-4 text-xl font-bold text-gray-900">
            {userName || 'Loading...'}
          </Text>

          <View className="w-full rounded-lg bg-[#157196] p-4">
            <Text className="text-center text-sm leading-5 text-white">
              Kindly fill out the form below and we will get back to you as soon as possible
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="px-5">
          {/* Ticket Category */}
          <Dropdown
            label="Ticket Category *"
            placeholder="Select a category"
            value={ticketCategory}
            options={TICKET_CATEGORY_OPTIONS}
            onSelect={setTicketCategory}
            isOpen={categoryOpen}
            onToggle={() => setCategoryOpen((prev) => !prev)}
            isLoading={isSubmitting}
            style={{ marginBottom: 16 }}
          />

          {/* Image Picker */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Image (optional)</Text>

            {imageUri ? (
              <View className="relative overflow-hidden rounded-lg border border-gray-300">
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: '100%', height: 180 }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={handleRemoveImage}
                  disabled={isSubmitting}
                  className="absolute right-2 top-2 rounded-full bg-black/50 p-1"
                  activeOpacity={0.8}>
                  <Ionicons name="close" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handlePickImage}
                disabled={isSubmitting}
                activeOpacity={0.8}
                className="items-center justify-center rounded-lg border border-dashed border-gray-300 py-8"
                style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                <Text className="mt-2 text-sm text-gray-400">Tap to select an image</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Comment */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Comment <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={comment}
              onChangeText={setComment}
              placeholder="Describe your issue"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              editable={!isSubmitting}
              style={{ minHeight: 120, opacity: isSubmitting ? 0.6 : 1 }}
            />
          </View>

          {/* Submit Button */}
          <TouchBtn
            onPress={handleSubmit}
            label="Submit"
            icon={<Ionicons name="paper-plane-outline" size={16} color="white" />}
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4 mb-3"
            activeOpacity={0.8}
            containerClassName=""
            isLoading={isSubmitting}
          />

          {/* Chat with Us Button */}
          <TouchBtn
            onPress={() => navigateTo('message')}
            label="Chat with Us"
            icon={<Ionicons name="chatbubble" size={16} color="#157196" />}
            textClassName="text-base font-semibold text-[#157196]"
            buttonClassName="items-center rounded-lg py-4 border-2 border-[#157196]"
            activeOpacity={0.8}
            variant="outline"
            containerClassName=""
            isLoading={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}