# Client Stories Carousel - Integration Guide

This guide provides step-by-step instructions for integrating the `ClientStoriesCarousel` component with your admin-driven review content.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration Options](#configuration-options)
3. [Integration Steps](#integration-steps)
4. [Admin Content Management](#admin-content-management)
5. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Option 1: Replace Existing Component (Recommended)

Update [`src/App.jsx`](src/App.jsx:75) to use the new carousel:

```jsx
// Import the new carousel component
import ClientStoriesCarousel from './components/ClientStoriesCarousel';

// Replace the existing ClientStories component
// Change this:
<ClientStories />

// To this:
<ClientStoriesCarousel />
```

### Option 2: Customized Carousel

```jsx
// With custom configuration
<ClientStoriesCarousel 
  config={{
    scrollSpeed: 5000,        // 5 seconds between slides
    visibleSlides: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    autoPlay: true,
    pauseOnHover: true,
    showArrows: true,
    showDots: true,
  }}
/>
```

---

## Configuration Options

The carousel accepts a `config` prop with the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `scrollSpeed` | `number` | `4000` | Auto-scroll interval in milliseconds |
| `visibleSlides` | `object` | `{ mobile: 1, tablet: 2, desktop: 3 }` | Slides visible at each breakpoint |
| `autoPlay` | `boolean` | `true` | Enable/disable auto-scrolling |
| `pauseOnHover` | `boolean` | `true` | Pause auto-scroll when user hovers |
| `showArrows` | `boolean` | `true` | Show prev/next navigation arrows |
| `showDots` | `boolean` | `true` | Show pagination dots |
| `transitionDuration` | `number` | `500` | Slide transition duration in ms |

### Visible Slides Breakpoints

```jsx
visibleSlides: {
  mobile: 1,   // < 640px
  tablet: 2,   // 640px - 1024px
  desktop: 3,  // > 1024px
}
```

### Configuration Presets

#### Fast Scrolling (Trade Shows/Kiosks)
```jsx
<ClientStoriesCarousel 
  config={{
    scrollSpeed: 2000,
    visibleSlides: { mobile: 1, tablet: 2, desktop: 4 },
    pauseOnHover: false,
  }}
/>
```

#### Slow/Relaxed (Professional Services)
```jsx
<ClientStoriesCarousel 
  config={{
    scrollSpeed: 8000,
    visibleSlides: { mobile: 1, tablet: 2, desktop: 3 },
    autoPlay: true,
    pauseOnHover: true,
  }}
/>
```

#### Static (No Auto-Scroll)
```jsx
<ClientStoriesCarousel 
  config={{
    scrollSpeed: 0,
    autoPlay: false,
    showArrows: true,
    showDots: true,
  }}
/>
```

---

## Integration Steps

### Step 1: Add the Component to Your Project

The carousel component is located at:
```
src/components/ClientStoriesCarousel.jsx
```

### Step 2: Import in Your Page

In your home page (e.g., [`src/App.jsx`](src/App.jsx:1)):

```jsx
import ClientStoriesCarousel from './components/ClientStoriesCarousel';
```

### Step 3: Replace the Static Grid

Find where `<ClientStories />` is used and replace it:

```jsx
// src/App.jsx

function App() {
  return (
    <div className="App">
      {/* ... other components ... */}
      
      {/* Replace this: */}
      {/* <ClientStories /> */}
      
      {/* With the carousel: */}
      <ClientStoriesCarousel />
      
      {/* ... other components ... */}
    </div>
  );
}
```

### Step 4: Verify the API Endpoint

The carousel automatically fetches data from `/api/client-stories`. Ensure your server has this endpoint configured in [`server.js`](server.js:1852):

```javascript
// GET all active client stories (public)
app.get('/api/client-stories', async (req, res) => {
  // ... existing implementation
});
```

### Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your home page
3. Verify the carousel:
   - Auto-scrolls through stories
   - Pauses on hover
   - Navigation arrows work
   - Pagination dots are visible
   - Responsive breakpoints adjust correctly

---

## Admin Content Management

### Accessing the Admin Dashboard

1. Navigate to `/admin` on your website
2. Log in with admin credentials
3. Find the **"Client Stories"** section

### Adding New Client Stories

1. Click **"Add Client Story"** button
2. Fill in the form fields:

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `client_name` | Yes | Client's full name | John Smith |
| `company` | Yes | Company name | Acme Corp |
| `role` | Yes | Job title | CEO |
| `industry` | No | Industry sector | Financial Services |
| `rating` | No | Star rating (1-5) | 5 |
| `quote` | Yes | Testimonial text | "Amazing service!" |
| `avatar_url` | No | Profile image URL | https://... |

3. Click **"Add Client Story"** to save

### Editing Existing Stories

1. Find the story you want to edit in the list
2. Click the **"Edit"** button
3. Modify the fields as needed
4. Click **"Update Client Story"** to save changes

### Deleting Stories

1. Find the story you want to delete
2. Click the **"Delete"** button
3. Confirm the deletion in the popup dialog

### Content Best Practices

For optimal carousel display:

1. **Quote Length**: Keep quotes between 100-250 characters
2. **Consistent Rating**: Use 4-5 stars for best visual appeal
3. **Avatar Images**: Use square images (minimum 100x100px)
4. **Company Names**: Keep under 30 characters for best display
5. **Minimum Stories**: Have at least 3 stories for effective carousel

---

## API Reference

### GET /api/client-stories

Returns all client stories from the database.

**Response:**
```json
[
  {
    "id": 1,
    "client_name": "John Smith",
    "company": "Acme Corp",
    "role": "CEO",
    "industry": "Financial Services",
    "rating": 5,
    "quote": "This service transformed our business!",
    "avatar_url": "https://example.com/avatar.jpg",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

---

## Troubleshooting

### Carousel Not Appearing

**Possible Causes:**
1. No client stories in database
2. API endpoint not configured
3. Network request failing

**Solutions:**
- Add at least one client story via admin dashboard
- Check browser console for API errors
- Verify `/api/client-stories` endpoint is working

### Auto-Scroll Not Working

**Possible Causes:**
1. Only one story available
2. `autoPlay` set to false
3. JavaScript error

**Solutions:**
- Add more client stories (minimum 2 for scrolling)
- Check config: `autoPlay: true`
- Check browser console for errors

### Hover Pause Not Working

**Possible Causes:**
1. Touch device (hover events don't apply)
2. `pauseOnHover` set to false

**Solutions:**
- Test on desktop with mouse
- Check config: `pauseOnHover: true`

### Navigation Arrows Not Visible

**Possible Causes:**
1. Only one slide visible
2. Arrows disabled in config

**Solutions:**
- Add more stories or adjust `visibleSlides`
- Check config: `showArrows: true`

### Responsive Issues

**Possible Causes:**
1. CSS conflicts
2. Container width issues

**Solutions:**
- Check if parent containers have fixed widths
- Ensure carousel has `maxWidth: '1200px'` (default)
- Review custom CSS for conflicts

---

## Browser Support

The carousel supports all modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Mobile Support:**
- iOS Safari 13+
- Chrome Mobile
- Samsung Internet

---

## Performance Notes

- Carousel uses CSS transforms for smooth animations
- No external dependencies (pure React + CSS)
- Lazy loads content from API
- Touch/swipe support for mobile devices
- Debounced resize handler for responsive adjustments

---

## Future Enhancements

Potential additions for future versions:
- [ ] Keyboard navigation (left/right arrows)
- [ ] Auto-height adjustment based on content
- [ ] Video testimonials support
- [ ] Rich text quotes with formatting
- [ ] Category/filter support
- [ ] Animation variations (fade, slide, etc.)

---

## Support

For issues or questions, please check:
1. This integration guide
2. Component source code comments
3. Browser console for error messages
