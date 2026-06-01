# Todo List Application

A modern, feature-rich todo list app with local storage persistence built with React and Vite.

## ✨ Features

- ✅ **Add, complete, and delete todos**
- 💾 **Local storage persistence** - todos saved automatically
- 🔍 **Filter todos** - View all, active, or completed items
- 📊 **Statistics** - Track total, active, completed, and completion percentage
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile
- ⌨️ **Keyboard friendly** - Easy form validation and error handling
- 🚀 **Fast** - Built with React + Vite for optimal performance

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

```bash
cd todo-app
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 💾 Local Storage

All todos are automatically saved to your browser's local storage. This means:
- Your todos persist across browser sessions
- No backend required
- Data stays on your device
- Clear your browser data to reset

## 🎯 How to Use

1. **Add a todo**: Type in the input field and click the `+` button or press Enter
2. **Complete a todo**: Click the checkbox next to a todo
3. **Delete a todo**: Click the `✕` button
4. **Filter**: Click the filter buttons to show All, Active, or Completed todos
5. **Clear completed**: Click "Clear Completed" to remove all finished todos

## 📦 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **CSS3** - Styling with animations
- **Local Storage API** - Data persistence

## 🏗️ Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoStats.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 📝 Component Overview

### App.jsx
Main component managing state, local storage, and filtering logic.

### TodoForm.jsx
Form for adding new todos with validation.

### TodoList.jsx
Container for displaying filtered todos.

### TodoItem.jsx
Individual todo item with checkbox, text, date, and delete button.

### TodoStats.jsx
Displays statistics about todos (total, active, completed, completion rate).

## 🎨 Styling

- Gradient purple theme
- Smooth animations and transitions
- Hover effects for better UX
- Responsive grid layout
- Mobile-optimized

## 🚀 Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📄 License

MIT
