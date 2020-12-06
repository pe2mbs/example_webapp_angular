import backend.core.api as CORE


CORE.menuItems = [
    { 'caption': 'Dashboard',
      'icon': 'dashboard',
      'route': '/dashboard'
    },
    { 'caption': 'Administration',
      'icon': 'settings',
      'children': []
    },
    { 'caption': 'Feedback',
      'icon': 'feedback',
      'route': '/feedback'
    }
]