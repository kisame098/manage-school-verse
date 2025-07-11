
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '37 99 235', // #2563eb - Bleu principal EduManage
					50: '239 246 255',
					100: '219 234 254',
					200: '191 219 254',
					300: '147 197 253',
					400: '96 165 250',
					500: '59 130 246',
					600: '37 99 235',
					700: '29 78 216',
					800: '30 64 175',
					900: '30 58 138',
					foreground: '210 40% 98%'
				},
				secondary: {
					DEFAULT: '13 148 136', // #0d9488 - Turquoise secondaire
					50: '240 253 250',
					100: '204 251 241',
					200: '153 246 228',
					300: '94 234 212',
					400: '45 212 191',
					500: '20 184 166',
					600: '13 148 136',
					700: '15 118 110',
					800: '17 94 89',
					900: '19 78 74',
					foreground: '222.2 47.4% 11.2%'
				},
				accent: {
					DEFAULT: '234 88 12', // #ea580c - Orange accent
					50: '255 247 237',
					100: '255 237 213',
					200: '254 215 170',
					300: '253 186 116',
					400: '251 146 60',
					500: '249 115 22',
					600: '234 88 12',
					700: '194 65 12',
					800: '154 52 18',
					900: '124 45 18',
					foreground: '222.2 47.4% 11.2%'
				},
				success: {
					DEFAULT: '22 163 74', // #16a34a - Vert succès
					50: '240 253 244',
					100: '220 252 231',
					200: '187 247 208',
					300: '134 239 172',
					400: '74 222 128',
					500: '34 197 94',
					600: '22 163 74',
					700: '21 128 61',
					800: '22 101 52',
					900: '20 83 45',
					foreground: '210 40% 98%'
				},
				warning: {
					DEFAULT: '217 119 6', // #d97706 - Jaune/Orange avertissement
					50: '255 251 235',
					100: '254 243 199',
					200: '253 230 138',
					300: '252 211 77',
					400: '251 191 36',
					500: '245 158 11',
					600: '217 119 6',
					700: '180 83 9',
					800: '146 64 14',
					900: '120 53 15',
					foreground: '210 40% 98%'
				},
				error: {
					DEFAULT: '220 38 38', // #dc2626 - Rouge erreur
					50: '254 242 242',
					100: '254 226 226',
					200: '254 202 202',
					300: '252 165 165',
					400: '248 113 113',
					500: '239 68 68',
					600: '220 38 38',
					700: '185 28 28',
					800: '153 27 27',
					900: '127 29 29',
					foreground: '210 40% 98%'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 0 8px rgba(37, 99, 235, 0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
