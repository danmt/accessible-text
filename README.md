# Make it Accessible: No More Walls of Text in Angular

In this article we are going to cover text, rendering it using HTML and how easy its to create blocks of non accessible text with Angular. This is part of a series that I'm continuosly writing looking to share the things I learn about accessibility.

In my last talk about a11y in Angular I met a few colleagues and they asked me, how do you deal with text that has multiple paragraphs? My first thought was, well, multiple `<p>` tags, one for each paragraph. But let's face it, how common its to have static text in an Angular app? How probable it's for you to know beforehand the number of required paragraphs?

I ended up saying, you know what guys? I'm gonna do this at home, and, VOILA! This post was born. Let's get started by analyzing the problem.

## The Problem

Content in an Angular Application commonly comes from some kind of service and for that reason we are almost never sure of how long the content is and how many paragraphs it has. I used to do something like `<p>{{someTextContent}}</p>` but this means we always have a single paragraph, this leads us to have a single wall of text and for screen reader users makes it impossible to navigate through paragraphs.

We could say that the problem is that there's no built-in mechanism to display content divided by paragraph in an Angular Template.

## The Hypothesis

First thing to do is to create a shared component that will get the text content, will split by the break lines (\n), the array of paragraphs will be given to a `<p>` tag using the `ngFor` directive that will generate one `<p>` tag for each paragraph in the array.

If we are rendering the `<p>` tags inside a component, Angular's view encapsulation will prohibit us from customizing them. We'll need to have some sort of mechanism to dynamically have styles to the `<p>` tags. For this we can use the ngTemplateOutlet directive.

## The Implementation

In order to visualize the problem and to proof the hypothesis I wrote a super small app that displays the same block of text inside 2 different articles. We have to end up with one with default styling and one with custom styles. The text we'll use for testing consists on 4 paragraphs with placeholder data, after running the app you'll see that all paragraphs get concatenated.

We'll start by creating the _TextComponent_ that will transform that into actual paragraphs. I created a repository and it has a branch with [the base state of the project](https://github.com/danmt/accessible-text/tree/base), go ahead a clone that branch so we can do this together.

### 1. The Text Component

First we'll need to generate the component, as usual I'll let Angular CLI do it for me. You can do that by following these steps:

- Go to project's directory
- Execute `ng generate component --name=shared/components/text --export`

That easy you have the new component, we could create a SharedModule and declare the component there but I wanted to keep it short and focused on the actual problem, making better texts.

Go to the `src/app/shared/components/text/text.component.ts` file and change it to this:

```typescript
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  private text$ = new BehaviorSubject('');

  // Observable that emits a text content splitted
  // by paragraph.
  paragraphs$ = this.text$.asObservable().pipe(
    map((content: string) =>
      content
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line)
    )
  );

  // Input that receives the content and emits it to the
  // Subject every time it changes.
  @Input() set innerContent(text: string) {
    this.text$.next(text);
  }
}
```

Now we have to make sure we render the paragraphs properly by using a combination of the `ngFor` directive and the `async` pipe. Go to the `src/app/shared/components/text/text.component.html` and do this:

```html
<p *ngFor="let paragraph of paragraphs$ | async">{{ paragraph }}</p>
```

With that in place, is just a matter of using our new component! Go to the `src/app/app.component.html` and do this:

```html
<header>
  <h1>Accessible Text</h1>
</header>

<main>
  <article class="card">
    <h2>Simple text</h2>
    <app-text [innerContent]="simpleText"></app-text>
  </article>

  <article class="card">
    <h2>Custom Text</h2>
    <app-text [innerContent]="simpleText"></app-text>
  </article>
</main>
```

### 2. It's time for customization

Now that our text is divided in paragraphs, someone could say we got what we wanted. But if you are like me, you probably want more power. How can we make this more customizable? The answer is... _DRUMS_ ngTemplateOutlet directive.

This can get tricky, I'm not going into detail about ngTemplateOutlet, if you think that an article about it would be useful just drop a comment below.

Being extremely brief, what ngTemplateOutlet allows you is to attach a TemplateRef to an element and gives you a mechanism to provide it a context variable. In our case we'll add the `<ng-template>` inside the `TextComponent`, then we can access it using the `ContentChild` decorator.

Let's start by creating our first custom `<p>`, I want to do something fancy, so Im gonna split the card content into to columns and will make the first letter of the first paragraph larger and with other style. That means will need something like this in our template:

```html
<p class="paragraph" [ngClass]="{ first: first }">
  {{ paragraph }}
</p>
```

Accompanied by some styles:

```scss
.paragraph {
  background-color: #222233;
  color: #aaccff;
  margin: 0;
  margin-bottom: 2rem;
  text-align: justify;
  text-indent: 2rem;
  line-height: 2;

  &.first {
    &::first-letter {
      font-size: 200%;
      font-family: 'Times New Roman', Times, serif;
      color: #bbddff;
    }
  }
}
```

We want to use this new element in our text, but if we do this directly in the `TextComponent`, all the instances are going to be affected, we could make the `.paragraph` class conditional and that would work but what if we want another style? We don't want to create another class that will also be conditional.

At this point we could pass the styles to the component as an Input property, but what about the `::first-letter` pseudo-element? We cannot assign it using inline style nor with the `ngStyle` directive.

We need somehow, to be able to give a `template` to the `TextComponent` that will be used to render each paragraph. That way each paragraph can have custom paragraphs, one thing to have in mind is that I still want to provide as a default behavior a clean `<p>` tag.

Let's start by modifying the way we use the `TextComponent` in the `AppComponent`, so go ahead and open `src/app/app.component.html`:

```html
<main>
  <!-- ... -->
  <article class="card custom">
    <h2 class="custom__title">Custom Text</h2>
    <app-text [innerContent]="simpleText">
      <ng-template #paragraphTemplate let-ctx>
        <p class="custom__paragraph" [ngClass]="{ first: ctx.first }">
          {{ ctx.paragraph }}
        </p>
      </ng-template>
    </app-text>
  </article>
  <!-- ... -->
</main>
```

The actual change was that we added this to the content of the `TextComponent`:

```html
<ng-template #paragraphTemplate let-ctx>
  <p class="custom__paragraph" [ngClass]="{ first: ctx.first }">
    {{ ctx.paragraph }}
  </p>
</ng-template>
```

I'm creating a new template, you can hydrate the template with information through the `let-ctx` attribute, note that the `ctx` part is up to you, I just like to use that name. When we use this template with the `ngTemplateOutlet` we are able to dynamically assign the value to `ctx`.

Also, I included the paragraph styles and some customizations into the `.custom` class in `src/app/app.component.scss`:

```scss
.custom {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #111122;
  color: #cceeff;
  column-count: 2;
  column-gap: 40px;
  column-rule-style: solid;
  column-rule-color: #cceeff;

  &__title {
    column-span: all;
    text-align: center;
  }

  &__paragraph {
    background-color: #222233;
    color: #aaccff;
    margin: 0;
    margin-bottom: 2rem;
    text-align: justify;
    text-indent: 2rem;
    line-height: 2;

    &.first {
      &::first-letter {
        font-size: 200%;
        font-family: 'Times New Roman', Times, serif;
        color: #bbddff;
      }
    }
  }
}
```

If you try it right now, you'll notice that nothing has changed and the styles are not being applied. We need to give the `TextComponent` the ability to access the template in its content with a template reference variable equal to `paragraphTemplate` and then using it with the `ngTemplateOutlet` directive.

We'll start with the `src/app/shared/components/text/text.component.ts`:

```typescript
import { /* ... */ ContentChild, TemplateRef } from '@angular/core';

// ...
export class TextComponent {
  @ContentChild('paragraphTemplate', { static: true })
  paragraphTemplateRef: TemplateRef<any>;
  // ...
}
```

To access a template that's part of the content of the component you can use the `ContentChild` decorator and use the value assign in the template reference variable, in this case _paragraphTemplate_.

Now that we have access to it, is time to use it. Go to `src/app/shared/components/text/text.component.html`:

```html
<!-- Default template, in case it wasnt provided -->
<ng-template #defaultParagraphTemplate let-ctx>
  <p>{{ ctx.paragraph }}</p>
</ng-template>

<!-- The actual rendering of the paragraphs -->
<ng-container
  *ngFor="let paragraph of paragraphs$ | async; let first = first"
  [ngTemplateOutlet]="paragraphTemplateRef || defaultParagraphTemplate"
  [ngTemplateOutletContext]="{
    $implicit: { first: first, paragraph: paragraph }
  }"
>
</ng-container>
```

The first time a saw something like this, I said: "Wait, what da fu.." So lets go piece by piece. the `ngTemplateOutlet` directive allows you to provide a template that will be rendered, so we are assigning the provided `paragraphTemplateRef`. Since we want to have a default presentation I created a second template variable reference that's used when the user doesnt provide a custom template.

The other thing to notice is the `ngTemplateOutletContext`, that's the mechanism provided by the Angular team to hydrate templates with data. The `{ first: first, paragraph: paragraph }` will be assigned to `ctx` in the template.

## Conclusion

You just did it, now you have a way to make sure your texts arent super boring walls of text, even if they come from the server. And as a bonus, we made it highly customizable so you can reuse the strategy in any of your projects. If you want to learn more about `ngTemplateOutlet` you definetely have to go watch [this talk about `ngTemplateOutlet` by Stephen Cooper](https://www.youtube.com/watch?v=2SnVxPeJdwE&t=1203s), all the techniques I used here I learnt from that talk.
