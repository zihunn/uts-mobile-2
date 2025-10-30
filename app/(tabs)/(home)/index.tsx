import React, { useRef } from "react";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Animated,
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const theme = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Skills data - only names needed now
  const skills = [
    "Gitlab",
    "PHP",
    "Laravel",
    "Flutter",
    "Dart",
    "AWS Service",
    "Docker",
    "Jenkins",
    "Ubuntu Server",
    "Node Js",
    "Kubernetes",
  ];

  // Parallax effect for profile photo
  const profileScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.3, 1, 0.9],
    extrapolate: "clamp",
  });

  const profileOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  // Fade in animation for cards
  const cardOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0.5, 1, 1],
    extrapolate: "clamp",
  });

  return (
    <>
      {Platform.OS === "ios" && (
        <Stack.Screen
          options={{
            title: "Tentang Saya",
            headerLargeTitle: true,
            headerTransparent: false,
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
          {/* Profile Photo with Parallax */}
          <Animated.View
            style={{
              transform: [{ scale: profileScale }],
              opacity: profileOpacity,
            }}
          >
            <GlassView
              style={[
                styles.profileCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <LinearGradient
                colors={["#4facfe", "#00f2fe", "#43e97b"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.photoContainer}
              >
                <IconSymbol name="person.fill" size={80} color="white" />
              </LinearGradient>

              {/* Name and Title */}
              <Text style={[styles.name, { color: "#000000" }]}>
                Muhammad Rizki
              </Text>
              <Text style={[styles.title, { color: "#666" }]}>
                Fullstack Developer
              </Text>

              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: "rgba(52, 199, 89, 0.15)" },
                ]}
              >
                <View style={styles.statusDot} />
                <Text style={[styles.statusText, { color: "#34C759" }]}>
                  Available for Work
                </Text>
              </View>
            </GlassView>
          </Animated.View>

          {/* Bio Section with Animation */}
          <Animated.View style={{ opacity: cardOpacity }}>
            <GlassView
              style={[
                styles.bioCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: theme.colors.primary + "20" },
                  ]}
                >
                  <IconSymbol
                    name="person.text.rectangle"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={[styles.sectionTitle, { color: "#000000" }]}>
                  Tentang Saya
                </Text>
              </View>
              <Text style={[styles.bioText, { color: "#666" }]}>
                Mahasiswa Informatika dengan minat pada Fullstack Developer.
              </Text>
            </GlassView>
          </Animated.View>

          {/* Skills Section with Tags */}
          <Animated.View style={{ opacity: cardOpacity }}>
            <GlassView
              style={[
                styles.skillsCard,
                Platform.OS !== "ios" && {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              ]}
              glassEffectStyle="regular"
            >
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: theme.colors.primary + "20" },
                  ]}
                >
                  <IconSymbol
                    name="star.fill"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={[styles.sectionTitle, { color: "#000000" }]}>
                  Keahlian
                </Text>
              </View>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <SkillItem
                    key={index}
                    skill={skill}
                    theme={theme}
                    delay={index * 50}
                  />
                ))}
              </View>
            </GlassView>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View style={{ opacity: cardOpacity }}>
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
                <Text
                  style={[styles.statNumber, { color: theme.colors.primary }]}
                >
                  10+
                </Text>
                <Text style={[styles.statLabel, { color: "#666" }]}>
                  Proyek
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
                <Text
                  style={[styles.statNumber, { color: theme.colors.primary }]}
                >
                  2+
                </Text>
                <Text style={[styles.statLabel, { color: "#666" }]}>Tahun</Text>
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
                <Text
                  style={[styles.statNumber, { color: theme.colors.primary }]}
                >
                  11+
                </Text>
                <Text style={[styles.statLabel, { color: "#666" }]}>
                  Skills
                </Text>
              </GlassView>
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </View>
    </>
  );
}

// Skill Item Component - Simple Tag/Chip Style
function SkillItem({
  skill,
  theme,
  delay,
}: {
  skill: string;
  theme: any;
  delay: number;
}) {
  const [animated] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animated, {
      toValue: 1,
      delay: delay,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  const scale = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const opacity = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.skillTag,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <LinearGradient
        colors={["rgba(79, 172, 254, 0.15)", "rgba(0, 242, 254, 0.15)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.skillTagGradient}
      >
        <View style={styles.skillTagContent}>
          <IconSymbol
            name="checkmark.circle.fill"
            size={16}
            color={theme.colors.primary}
          />
          <Text style={[styles.skillName, { color: "#000000" }]}>{skill}</Text>
        </View>
      </LinearGradient>
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
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34C759",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  bioCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
  },
  skillsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillTag: {
    borderRadius: 12,
    overflow: "hidden",
  },
  skillTagGradient: {
    borderRadius: 12,
  },
  skillTagContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  educationCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  educationItem: {
    gap: 8,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },
  yearBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yearBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  educationSchool: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  educationDetails: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
