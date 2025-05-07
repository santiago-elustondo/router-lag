single colon can be inline :cite[inner text **strong!**]{#yo .classy flagged num=3 str='hello'}
but inline double colons are treated like regular text ::cite[inner text **strong!**]{#yo .classy flagged num=3 str='hello'}
single line breaks are treated as regular text 
and do not end the text node
inline elements will *end the text node* but not the paragraph
* a star followed by a space starts a list (and list-item, paragraph), and terminates the previous paragraph
  same rules apply here, even if we tab for aligment, we're still in the same text (and paragraph, list-item)
  * tabbing before * signals nested list
  * another child
* another peer
### headings will also break a paragraph (and text within)
unlike a text node, a line break will end a heading and begin a paragraph 
**weirdly a**

*weirdly,* --
a paragraph can be broken  by \n
-
dfdfdfasdfsdf
