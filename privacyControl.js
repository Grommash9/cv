function updatePrivacy() {
    const urlParams = new URLSearchParams(window.location.search);
    const hideContacts = urlParams.get('hideContacts') === 'true';
    
    const contacts = document.querySelector('.contacts');
    const platformLinks = document.querySelectorAll('.job-title a');
    
    if (hideContacts) {
      // Hide contacts section
      contacts.style.display = 'none';
      
      // Replace links with their text content
      platformLinks.forEach(link => {
        const platformName = link.textContent;
        const textNode = document.createTextNode(platformName);
        link.parentNode.insertBefore(textNode, link);
        link.remove();
      });
      
      // Add privacy notice
      const notice = document.createElement('div');
      notice.className = 'privacy-notice';
      notice.textContent = 'Contact information removed because of platform rules';
      notice.style.color = '#666';
      notice.style.fontStyle = 'italic';
      notice.style.margin = '10px 0';
      contacts.parentNode.insertBefore(notice, contacts.nextSibling);
    }
  }
  
  document.addEventListener('DOMContentLoaded', updatePrivacy);
  window.updatePrivacy = updatePrivacy;