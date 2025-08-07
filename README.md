# CRM System

A modern, feature-rich Customer Relationship Management (CRM) system built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. This project follows the Feature First Approach for better organization and maintainability.

## 🚀 Features

### Core CRM Features
- **Dashboard**: Overview with key metrics and recent activities
- **Customer Management**: Complete customer lifecycle management
- **Deal Pipeline**: Sales opportunity tracking and management
- **Analytics**: Performance metrics and insights
- **Calendar**: Schedule management and appointments

### Technical Features
- **Modern UI**: Built with shadcn/ui components for a consistent, professional look
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type Safety**: Full TypeScript support for better development experience
- **Performance**: Optimized with Next.js 15 and Turbopack
- **Accessibility**: WCAG compliant components and navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── customers/         # Customer management feature
│   ├── deals/            # Deal pipeline feature
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Dashboard page
├── components/
│   ├── layout/           # Layout components
│   │   └── navigation.tsx
│   └── ui/              # shadcn/ui components
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── navigation-menu.tsx
│       └── table.tsx
└── lib/
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

This CRM system uses a comprehensive design system built on:

### Color Palette
- **Primary**: Blue (#2563eb) for main actions and branding
- **Secondary**: Gray (#6b7280) for supporting elements
- **Success**: Green (#16a34a) for positive actions
- **Warning**: Yellow (#ca8a04) for caution states
- **Error**: Red (#dc2626) for destructive actions

### Typography
- **Font**: Geist Sans for body text
- **Font**: Geist Mono for code and technical content

### Components
All UI components are built using shadcn/ui, ensuring:
- Consistent design language
- Accessibility compliance
- Responsive behavior
- Dark mode support (ready for implementation)

## 🔧 Feature First Approach

This project follows the Feature First Approach, organizing code by business features rather than technical concerns:

### Feature Organization
- **Dashboard**: Overview and analytics
- **Customers**: Customer management and relationships
- **Deals**: Sales pipeline and opportunity management
- **Analytics**: Performance metrics and reporting
- **Calendar**: Scheduling and appointment management

### Benefits
- **Maintainability**: Related code is co-located
- **Scalability**: Easy to add new features
- **Team Collaboration**: Clear ownership boundaries
- **Testing**: Feature-specific test organization

## 📊 Key Metrics Tracked

### Customer Metrics
- Total customers
- Customer status distribution
- Customer lifetime value
- Contact frequency

### Sales Metrics
- Pipeline value
- Win rate
- Average deal size
- Sales velocity

### Performance Metrics
- Revenue growth
- Customer acquisition cost
- Customer retention rate
- Sales cycle length

## 🔮 Future Enhancements

### Planned Features
- **Email Integration**: Connect with email providers
- **Calendar Integration**: Sync with Google Calendar, Outlook
- **Reporting**: Advanced analytics and custom reports
- **Mobile App**: React Native companion app
- **API Integration**: RESTful API for external integrations
- **Multi-tenancy**: Support for multiple organizations

### Technical Improvements
- **State Management**: Redux Toolkit or Zustand
- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service Worker implementation
- **Advanced Search**: Elasticsearch integration
- **File Upload**: Document and attachment management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the amazing React framework

---

Built with ❤️ using modern web technologies
