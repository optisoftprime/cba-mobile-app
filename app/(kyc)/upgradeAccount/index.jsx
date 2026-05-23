// screens/UpgradeAccount.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import TouchBtn from 'components/touchBtn';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';
import { getUser } from 'config/storage';
import { fetchAllKycTiers, kycUpgradeRequest } from 'api/kyc';

export default function UpgradeAccount() {
  const [tiers, setTiers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedTier, setSelectedTier] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTierName, setCurrentTierName] = useState(null);

  useEffect(() => {
    async function init() {
      setIsFetching(true);

      const [user, tiersResult] = await Promise.all([
        getUser(),
        fetchAllKycTiers(),
      ]);

      setCurrentTierName(user?.customerKycTier ?? null);

      if (tiersResult?.ok && Array.isArray(tiersResult?.data?.data)) {
        setTiers(tiersResult.data.data);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to load tiers',
          text2: tiersResult?.message || 'Please try again.',
        });
      }

      setIsFetching(false);
    }

    init();
  }, []);

  // Extract the numeric level from e.g. "TIER_2" → 2
  function tierLevel(tierName) {
    const match = tierName?.toString()?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const currentLevel = tierLevel(currentTierName);

  const isTierDisabled = (tier) => {
    return tierLevel(tier?.kycTierName) <= currentLevel;
  };

  const handlePickDocument = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({
        type: 'error',
        text1: 'Permission Denied',
        text2: 'Please allow access to your media library.',
      });
      return;
    }

    const required = selectedTier?.requiredDocuments ?? 1;
    const remaining = required - documents.length;

    if (remaining <= 0) {
      Toast.show({
        type: 'info',
        text1: 'Limit Reached',
        text2: `This tier requires exactly ${required} document${required > 1 ? 's' : ''}.`,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 0.8,
      base64: true,
    });

    if (result.canceled || !result.assets?.length) return;

    const picked = result.assets
      .filter((asset) => !!asset.base64)
      .slice(0, remaining)
      .map((asset) => {
        const extension = asset.uri?.split('.')?.pop()?.toLowerCase() ?? 'jpeg';
        const name = asset.fileName ?? `document.${extension}`;
        return { name, base64: asset.base64 };
      });

    if (picked.length > 0) {
      setDocuments((prev) => [...prev, ...picked]);
    }

    const newTotal = documents.length + picked.length;
    if (result.assets.length > remaining) {
      Toast.show({
        type: 'info',
        text1: 'Some files skipped',
        text2: `Only ${remaining} more document${remaining > 1 ? 's' : ''} allowed for this tier.`,
      });
    }
  };

  const handleRemoveDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpgrade = (tier) => {
    setSelectedTier(tier);
    setDocuments([]);
  };

  const handleCancelUpgrade = () => {
    if (isSubmitting) return;
    setSelectedTier(null);
    setDocuments([]);
  };

  const handleSubmitUpgrade = async () => {
    if (!selectedTier) return;

    const required = selectedTier?.requiredDocuments ?? 1;

    if (documents.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'No Documents',
        text2: 'Please attach the required documents.',
      });
      return;
    }

    if (documents.length !== required) {
      Toast.show({
        type: 'error',
        text1: 'Incorrect Document Count',
        text2: `This tier requires exactly ${required} document${required > 1 ? 's' : ''}. You have ${documents.length}.`,
      });
      return;
    }

    setIsSubmitting(true);

    Toast.show({
      type: 'info',
      text1: 'Submitting Upgrade Request',
      text2: 'Please wait...',
      autoHide: false,
    });

    const payload = {
      targetTierId: selectedTier?.id,
      documents: documents.map((d) => d.base64),
    };

    const result = await kycUpgradeRequest(null, payload);

    Toast.hide();
    setIsSubmitting(false);

    if (result?.ok) {
      Toast.show({
        type: 'success',
        text1: 'Request Submitted',
        text2: 'Your KYC upgrade request has been submitted.',
      });
      setSelectedTier(null);
      setDocuments([]);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Upgrade Failed',
        text2: result?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  // ─── Upgrade form view ────────────────────────────────────────────────────
  if (selectedTier) {
    const required = selectedTier?.requiredDocuments ?? 1;
    const remaining = required - documents.length;
    const hasEnough = documents.length === required;

    return (
      <View className="flex-1 bg-white">
        <Header
          title={`Upgrade to ${selectedTier?.displayName || selectedTier?.kycTierName}`}
          onLeftPress={handleCancelUpgrade}
          showLeftIcon={true}
          color="black"
        />

        <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
          {/* Tier info card */}
          <View className="mb-6 rounded-2xl bg-gray-50 px-5 py-5">
            <Text className="mb-1 text-base font-semibold text-gray-900">
              {selectedTier?.displayName || selectedTier?.kycTierName}
            </Text>
            {!!selectedTier?.description && (
              <Text className="mb-2 text-sm text-gray-500">{selectedTier.description}</Text>
            )}
            {!!selectedTier?.transactionLimit && (
              <Text className="text-sm" style={{ color: Colors?.primary }}>
                Transaction limit: ₦{Number(selectedTier.transactionLimit).toLocaleString()}
              </Text>
            )}
          </View>

          {/* Required documents info */}
          {Array.isArray(selectedTier?.documentTypes) && selectedTier.documentTypes.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-sm font-semibold text-gray-900">
                Required Documents ({required})
              </Text>
              {selectedTier.documentTypes.map((doc) => (
                <View key={doc?.id} className="mb-2 flex-row items-start">
                  <Ionicons
                    name="document-text-outline"
                    size={16}
                    color="#6B7280"
                    style={{ marginTop: 2, marginRight: 8 }}
                  />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-800">{doc?.name}</Text>
                    {!!doc?.description && (
                      <Text className="text-xs text-gray-500">{doc.description}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Attached documents */}
          <View className="mb-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-900">
                Attach Documents <Text className="text-red-500">*</Text>
              </Text>
              <Text className={`text-xs font-medium ${hasEnough ? 'text-green-600' : 'text-gray-400'}`}>
                {documents.length}/{required} attached
              </Text>
            </View>

            {documents.map((doc, index) => (
              <View
                key={index}
                className="mb-2 flex-row items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <Ionicons name="document-attach-outline" size={18} color="#6B7280" />
                <Text className="mx-3 flex-1 text-sm text-gray-700" numberOfLines={1}>
                  {doc?.name}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveDocument(index)}
                  disabled={isSubmitting}
                  activeOpacity={0.7}>
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}

            {documents.length < required && (
              <TouchableOpacity
                onPress={handlePickDocument}
                disabled={isSubmitting}
                activeOpacity={0.8}
                className="mt-1 flex-row items-center justify-center rounded-lg border border-dashed border-gray-300 py-4"
                style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                <Ionicons name="cloud-upload-outline" size={20} color="#9CA3AF" />
                <Text className="ml-2 text-sm text-gray-400">
                  Tap to attach ({remaining} more needed)
                </Text>
              </TouchableOpacity>
            )}

            {documents.length === required && (
              <View className="mt-1 flex-row items-center justify-center rounded-lg border border-dashed border-green-300 bg-green-50 py-4">
                <Ionicons name="checkmark-circle-outline" size={20} color="#16A34A" />
                <Text className="ml-2 text-sm text-green-600">All documents attached</Text>
              </View>
            )}
          </View>

          <View className="h-4" />

          <TouchBtn
            onPress={handleSubmitUpgrade}
            label="Submit Upgrade Request"
            isLoading={isSubmitting}
            loadingText="Submitting..."
            disabled={!hasEnough}
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4 mb-3"
            activeOpacity={0.8}
            containerClassName=""
          />

          <TouchBtn
            onPress={handleCancelUpgrade}
            label="Cancel"
            disabled={isSubmitting}
            textClassName="text-base font-semibold text-gray-700"
            buttonClassName="items-center rounded-lg py-4 border border-gray-300"
            activeOpacity={0.8}
            variant="outline"
            containerClassName=""
          />

          <View className="h-8" />
        </ScrollView>
      </View>
    );
  }

  // ─── Tiers list view ──────────────────────────────────────────────────────
  return (
    <View className="flex-1 bg-white">
      <Header
        title="Upgrade your Account"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {isFetching ? (
          <View className="mt-16 items-center">
            <ActivityIndicator size="large" color={Colors?.primary} />
            <Text className="mt-3 text-sm text-gray-400">Loading tiers...</Text>
          </View>
        ) : tiers.length === 0 ? (
          <View className="mt-16 items-center px-6">
            <Ionicons name="layers-outline" size={48} color="#D1D5DB" />
            <Text className="mt-4 text-center text-base font-semibold text-gray-400">
              No KYC tiers available
            </Text>
            <Text className="mt-1 text-center text-sm text-gray-400">
              Your organization has not configured any upgrade tiers yet.
            </Text>
          </View>
        ) : (
          tiers.map((tier) => {
            const disabled = isTierDisabled(tier);
            const isCurrent = tier?.kycTierName === currentTierName;

            return (
              <View
                key={tier?.id}
                className="mb-4 flex-row items-center justify-between rounded-2xl px-5 py-5"
                style={{ backgroundColor: disabled ? '#F9FAFB' : '#F0FDF4' }}>
                <View className="mr-3 flex-1">
                  <View className="mb-0.5 flex-row items-center gap-2">
                    <Text className="text-base font-semibold text-gray-900">
                      {tier?.displayName || tier?.kycTierName}
                    </Text>
                    {isCurrent && (
                      <View className="rounded-full bg-blue-100 px-2 py-0.5">
                        <Text className="text-xs font-medium text-blue-600">Current</Text>
                      </View>
                    )}
                  </View>
                  {!!tier?.description && (
                    <Text className="text-xs text-gray-500" numberOfLines={1}>
                      {tier.description}
                    </Text>
                  )}
                  {!!tier?.transactionLimit && (
                    <Text className="mt-1 text-xs" style={{ color: disabled ? '#9CA3AF' : Colors?.primary }}>
                      Limit: ₦{Number(tier.transactionLimit).toLocaleString()}
                    </Text>
                  )}
                  <Text className="mt-1 text-xs text-gray-400">
                    {tier?.requiredDocuments} document{tier?.requiredDocuments > 1 ? 's' : ''} required
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => !disabled && handleUpgrade(tier)}
                  disabled={disabled}
                  className="rounded-lg px-5 py-1.5"
                  style={{
                    backgroundColor: disabled ? '#E5E7EB' : '#86EFAC',
                    opacity: disabled ? 0.7 : 1,
                  }}
                  activeOpacity={0.8}>
                  <Text
                    className="text-sm font-medium"
                    style={{ color: disabled ? '#9CA3AF' : '#16A34A' }}>
                    {isCurrent ? 'Active' : disabled ? 'Passed' : 'Upgrade'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}