single colon can be inline :cite[inner text **strong!**]{#yo .classy flagged num=3 str='hello'}
but inline double colons are treated like regular text ::cite[inner text **strong!**]{#yo .classy flagged num=3 str='hello'}
single line breaks are treated as regular text 
and do not end the text node
inline elements will *end the text node* but not the paragraph
**weirdly,** single line breaks (which do not terminate a paragraph) are *removed* from the output text, and the text continues on the same line.
* a star followed by a space starts a list (and list-item, paragraph), and terminates the previous paragraph
  same rules apply here, even if we tab for aligment, we're still in the same text (and paragraph, list-item)
  * tabbing before * signals nested list
  * another child
* another peer
## headings will also break a paragraph (and text within)
unlike a text node, a line break will end the heading and begin a new paragraph but *weirdly* it does not get nested into the heading as a section (which is counterintuitive given their important structural role and commonly implied collapsibility)

*very weirdly,*
a paragraph can be broken with a single line break where the line contains 1 or more dashes in an unbroken line followed by whitespace. 
-
after the dash line, we begin a new paragraph.
in this *weird* case, the *whole* previous paragraph is shown like a level-2 heading (##) with an underline

this only applies to paragraphs and AST shows them as just a regular heading *but with no "depth"?? how does that affect structure?!😖*
* and not lists, following a list they are considered just another item even when empty
- 
- not sure what "spead" is, by the way (its always false)
- ...
- ^ this doesnt do anything
### lets try some headings
# to see how structure is affected

quotes also break paragraphs and
> ignore single line breaks,
effectively working like paragraphs except for the `weird` underline thing
* also broken by lists

```ts
code blocks *dont* work like paragraphs AT ALL
## none of the syntax rules apply here
language-specific syntax highlighting takes effect
and single like breaks dont disappear 😂
AST treats the whole thing as just a single "code" node
```

