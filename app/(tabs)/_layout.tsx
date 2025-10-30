
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'person.fill',
      label: 'Tentang',
    },
    {
      name: 'projects',
      route: '/(tabs)/projects',
      icon: 'folder.fill',
      label: 'Proyek',
    },
    {
      name: 'contact',
      route: '/(tabs)/contact',
      icon: 'envelope.fill',
      label: 'Kontak',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="person.fill" drawable="ic_person" />
          <Label>Tentang</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="projects">
          <Icon sf="folder.fill" drawable="ic_folder" />
          <Label>Proyek</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="contact">
          <Icon sf="envelope.fill" drawable="ic_mail" />
          <Label>Kontak</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none', // Remove fade animation to prevent black screen flash
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="projects" />
        <Stack.Screen name="contact" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={280} />
    </>
  );
}
