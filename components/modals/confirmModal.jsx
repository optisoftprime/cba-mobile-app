// components/ConfirmDangerModal.jsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TouchBtn from 'components/touchBtn';

export default function ConfirmDangerModal({
    visible,
    onClose,
    onConfirm,
    isLoading = false,
    title = 'Are you sure?',
    subtitle = 'This action cannot be undone.',
    confirmLabel = 'Yes, Proceed',
    cancelLabel = 'Cancel',
    icon = 'warning-outline',
}) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={isLoading ? undefined : onClose}>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {/* Backdrop */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={isLoading ? undefined : onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    />

                    {/* Sheet */}
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 28,
                            borderTopRightRadius: 28,
                            paddingHorizontal: 24,
                            paddingBottom: 40,
                            paddingTop: 20,
                        }}>
                        {/* Handle + close row */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                            <View style={{ width: 32 }} />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View
                                    style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D1D5DB' }}
                                />
                            </View>
                            {!isLoading ? (
                                <TouchableOpacity
                                    onPress={onClose}
                                    activeOpacity={0.7}
                                    style={{ width: 32, alignItems: 'flex-end' }}>
                                    <View
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            backgroundColor: '#FEE2E2',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Ionicons name="close" size={18} color="#EF4444" />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ width: 32 }} />
                            )}
                        </View>

                        {/* Danger icon */}
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <View
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 36,
                                    backgroundColor: '#FEF2F2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 6,
                                    borderColor: '#FEE2E2',
                                }}>
                                <Ionicons name={icon} size={34} color="#EF4444" />
                            </View>
                        </View>

                        {/* Title */}
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#111827',
                                marginBottom: 8,
                            }}>
                            {title}
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                color: '#6B7280',
                                marginBottom: 32,
                                lineHeight: 20,
                            }}>
                            {subtitle}
                        </Text>

                        {/* Confirm button — red danger */}
                        <TouchBtn
                            onPress={onConfirm}
                            label={confirmLabel}
                            isLoading={isLoading}
                            loadingText="Processing..."
                            textClassName="text-base font-semibold"
                            buttonClassName="items-center rounded-lg py-4 mb-3"
                            activeOpacity={0.8}
                            containerClassName=""
                            style={{ backgroundColor: '#EF4444' }}
                        />

                        {/* Cancel button — outline */}
                        <TouchBtn
                            onPress={onClose}
                            label={cancelLabel}
                            disabled={isLoading}
                            textClassName="text-base font-semibold text-gray-700"
                            buttonClassName="items-center rounded-lg py-4 border border-gray-300"
                            activeOpacity={0.8}
                            variant="outline"
                            containerClassName=""
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}