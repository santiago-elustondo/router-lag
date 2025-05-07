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
in this *weird* case, the *whole* previous paragraph is shown like a level-2 heading (##) with an underline (like all ##)

this only applies to paragraphs and AST shows them as just a regular heading *but with no "depth"?? how does that affect structure?!😖*
* and not lists, following a list they are considered just another item even when empty
- 
- not sure what "spead" is, by the way (its always false)
- ...
- ^ this doesnt do anything
### lets try some headings
# to see how structure is affected
## yep, its a ##...

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


Backticks inside code blocks (to avoid conflict):

```js
const code = "`inline` backticks inside code";
```

## Indented vs Fenced Code

    // This is an indented code block
    if (true) {
      return false;
    }

> GitHub treats indented code differently than fenced blocks.

## Lists: Mixed Nesting & Paragraphs

- First item
  - Nested item with paragraph:

    This paragraph is inside a list.

  - Still nested
- Second item continues

1. Ordered list
2. With `inline code`
   - Nested unordered under ordered
3. Third item

## Blockquotes and Escapes

> This is a quote
> > This is a nested quote
>
> With a break above

## Horizontal Rule Traps

Three dashes — are they a rule?

---
This one above is a horizontal rule. So is this:
___

But not this — (contains em dash)

— Not a rule

## Mixing Markdown and Raw HTML

<div markdown="1">
This **bold text** will be rendered inside a `<div>`.

* List items still work
* Even inside HTML
</div>

<div>
This **will not** be parsed as Markdown.
</div>

## Images and Links

Inline image:  
![Alt text](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

Inline link:  
[GitHub](https://github.com)

Reference-style link:

[GitHub Reference][gh]

[gh]: https://github.com

Broken reference:  
[Missing][does-not-exist]

## Escaping Characters

Escape \*stars\*, \_underscores\_, and \`backticks\`

HTML entities: &amp;, &lt;, &gt;, &quot;

## Tables and Alignment

| Left | Center | Right |
|:-----|:------:|------:|
| A    |   B    |     C |
| One  |  Two   |   Three |

Inline formatting inside table:

| Column | Description |
|--------|-------------|
| `x`    | Inline `code` |
| **A**  | *Italic* and **bold** |

## Autolinks and Angles

<https://github.com> becomes a link

Email: <user@example.com>

Brackets and parentheses in links:  
[Text](https://example.com/abc_(test)) ← works

## Escaped Headings (not actual headings)

\# Not a heading  
\\## Still not a heading

But this is:

### Legit Heading

## Emojis and Unicode

😄 👍 :+1: :sparkles:

✅ Task list:
- [x] Done
- [ ] Not done

## Footnotes

Here is a footnote reference[^1].

[^1]: This is the footnote content.
```
