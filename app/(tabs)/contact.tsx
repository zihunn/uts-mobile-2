import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  Linking,
  Alert,
  Animated,
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

// Contact item type
interface ContactItem {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  gradient: string[];
  action: () => void;
}

export default function ContactScreen() {
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Function to open email
  const openEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const email = "muhammadrizki.personal@gmail.com";
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert("Error", "Tidak dapat membuka aplikasi email");
    });
  };

  // Function to open GitHub
  const openGitHub = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const githubUrl = "https://github.com/zihunn";
    Linking.openURL(githubUrl).catch(() => {
      Alert.alert("Error", "Tidak dapat membuka GitHub");
    });
  };

  // Function to open WhatsApp
  const openWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const phoneNumber = "6285896173893";
    Linking.openURL(`https://wa.me/${phoneNumber}`).catch(() => {
      Alert.alert("Error", "Tidak dapat membuka WhatsApp");
    });
  };

  // Contact data with gradients
  const contacts: ContactItem[] = [
    {
      id: "1",
      label: "Email",
      value: "muhammadrizki.personal@gmail.com",
      icon: "envelope.fill",
      color: "#007AFF",
      gradient: ["#007AFF", "#0051D5"],
      action: openEmail,
    },
    {
      id: "3",
      label: "GitHub",
      value: "github.com/ahmadrizki",
      icon: "chevron.left.forwardslash.chevron.right",
      color: "#333333",
      gradient: ["#434343", "#000000"],
      action: openGitHub,
    },
    {
      id: "4",
      label: "WhatsApp",
      value: "+62 812-3456-7890",
      icon: "phone.fill",
      color: "#25D366",
      gradient: ["#25D366", "#1DA851"],
      action: openWhatsApp,
    },
  ];

  // Header parallax effect
  const headerScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.2, 1, 0.95],
    extrapolate: "clamp",
  });

  return (
    <>
      {Platform.OS === "ios" && (
        <Stack.Screen
          options={{
            title: "Kontak",
            headerLargeTitle: true,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: "#FFFFFF" }]}>
        <Animated.ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== "ios" && styles.scrollContentWithTabBar,
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Header with Parallax */}
          <Animated.View style={{ transform: [{ scale: headerScale }] }}>
            <GlassView
              style={[
                styles.headerCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <LinearGradient
                colors={["#4facfe", "#00f2fe"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerIcon}
              >
                <IconSymbol
                  name="person.crop.circle.badge.checkmark"
                  size={48}
                  color="white"
                />
              </LinearGradient>
              <Text style={[styles.headerTitle, { color: "#000000" }]}>
                Mari Terhubung!
              </Text>
              <Text style={[styles.headerSubtitle, { color: "#666" }]}>
                Jangan ragu untuk menghubungi saya melalui platform berikut
              </Text>
            </GlassView>
          </Animated.View>

          {/* Contact List with Staggered Animation */}
          <View style={styles.contactsSection}>
            <Text style={[styles.sectionTitle, { color: "#000000" }]}>
              Informasi Kontak
            </Text>

            {contacts.map((contact, index) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                index={index}
                theme={theme}
              />
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <GlassView
              style={[
                styles.statCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <IconSymbol
                name="clock.fill"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.statLabel, { color: "#666" }]}>Respons</Text>
              <Text style={[styles.statValue, { color: "#000000" }]}>
                &lt; 24 jam
              </Text>
            </GlassView>

            <GlassView
              style={[
                styles.statCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <IconSymbol
                name="location.fill"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={[styles.statLabel, { color: "#666" }]}>Lokasi</Text>
              <Text style={[styles.statValue, { color: "#000000" }]}>
                Jakarta
              </Text>
            </GlassView>

            <GlassView
              style={[
                styles.statCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <IconSymbol name="globe" size={24} color={theme.colors.primary} />
              <Text style={[styles.statLabel, { color: "#666" }]}>Zona</Text>
              <Text style={[styles.statValue, { color: "#000000" }]}>WIB</Text>
            </GlassView>
          </View>

          {/* Additional Info */}
          <GlassView
            style={[
              styles.infoCard,
              Platform.OS !== "ios" && { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
            glassEffectStyle="regular"
          >
            <View style={styles.infoHeader}>
              <View
                style={[
                  styles.infoIconContainer,
                  { backgroundColor: theme.colors.primary + "20" },
                ]}
              >
                <IconSymbol
                  name="info.circle.fill"
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={[styles.infoTitle, { color: "#000000" }]}>
                Catatan Penting
              </Text>
            </View>
            <Text style={[styles.infoText, { color: "#666" }]}>
              Saya biasanya merespons dalam 24 jam. Untuk pertanyaan mendesak,
              silakan hubungi melalui WhatsApp atau email. Saya terbuka untuk
              diskusi proyek, kolaborasi, atau sekadar berbagi ide!
            </Text>
          </GlassView>
        </Animated.ScrollView>
      </View>
    </>
  );
}

// Contact Card Component with Animation
function ContactCard({
  contact,
  index,
  theme,
}: {
  contact: ContactItem;
  index: number;
  theme: any;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={contact.action}
      >
        <GlassView
          style={[
            styles.contactCard,
            Platform.OS !== "ios" && { backgroundColor: "rgba(0,0,0,0.05)" },
          ]}
          glassEffectStyle="regular"
        >
          <LinearGradient
            colors={contact.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.contactIcon}
          >
            <IconSymbol name={contact.icon} size={24} color="white" />
          </LinearGradient>

          <View style={styles.contactInfo}>
            <Text style={[styles.contactLabel, { color: "#666" }]}>
              {contact.label}
            </Text>
            <Text style={[styles.contactValue, { color: "#000000" }]}>
              {contact.value}
            </Text>
          </View>

          <View
            style={[
              styles.arrowContainer,
              { backgroundColor: "rgba(0,0,0,0.04)" },
            ]}
          >
            <IconSymbol
              name="arrow.right"
              size={18}
              color={theme.colors.primary}
            />
          </View>
        </GlassView>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 0 : 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
  },
  contactsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  contactCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  contactInfo: {
    flex: 1,
    gap: 4,
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  contactValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
  },
});
