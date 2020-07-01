How to create a widget?
=======================

You need to create two files: <widget_name>.tag and <widget_name>.js (replace <widget_name> with the actual name of the widget). Include these two files in editor.html.

<widget_name>.tag contains the widget's HTML, CSS and JS code that is needed to show the widget on editor/preview page/package and make it function properly. 

<widget_name>.js handles the whole lifecycle of widget - widget creation and widget update.

Add your widgets initial json in views/smart_patterns/widgets.js

Lifecycle methods
=================

init()
------
This method is called when the widget is dropped.
It must return the ID of the newly created widget by returning the return value of getWidgetId()

edit()
------
This method is called when user triggers the edit action for the widget.


Widget class (used by <widget_name>.js and defined in widget_api.js)
============

Widget() Constructor
--------------------
Takes settings object as argument

Widget.openAddModal(addFormHTML)
------------------
Aceepts HTML of add form modal as a parameter. 
Adds this HTML to the modal. 
Opens the add form modal.
Next you need to bind the events to the form yourself

Widget.openAddPanel(editFormHTML)
------------------
Aceepts HTML of edit form as a parameter. 
Adds this HTML to the modal. 
Opens the edit form panel.
Next you need to bind the events to the form yourself

Widget.saveSettings()
---------------------
It is used to update the settings object of the widget. After calling this you will need to call insert() or reMount() to see the updated settings in the widgets.

Widget.insert(settings)
---------------
It saves the settings passed to it and then mounts the widget (adds the widget in dom)

Widget.reMount(settings)
----------------
It saves the settings passed to it and then remounts the widget

Widget.closeAddModal()
----------------------
Hides the add widget Modal

Widget.hideSettingsPanel()
--------------------------
Hides the settings panel

Widget.getWidgetId()
--------------------
returns the id of the widget

Constraints
===========
- init() must return the id of the newly initialized widget
