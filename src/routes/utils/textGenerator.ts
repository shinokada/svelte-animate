type TextArray = string[];

interface ITextGenerator {
  getRandomItem(array: TextArray): string;
  getGreeting(): string;
  getQuestion(): string;
  getSentence(): string;
  getGreetingWithQuestion(): string;
  getMultipleSentences(count?: number): string;
}

export class TextGenerator implements ITextGenerator {
  private readonly greetings: TextArray;
  private readonly questions: TextArray;
  private readonly sentences: TextArray;

  constructor() {
    this.greetings = ['Hello!', 'Hi there!', 'Hey!', 'Greetings!', 'Welcome!', 'Good day!'];

    this.questions = [
      'How are you?',
      "How's your day going?",
      "What's new?",
      'How have you been?',
      "What's up?",
      "How's everything?"
    ];

    this.sentences = [
      'The quick brown fox jumps over the lazy dog.',
      'A wonderful serenity has taken possession of my soul.',
      'Far far away, behind the word mountains.',
      'The sky was cloudless and of a deep dark blue.',
      'The wind howled through the empty hallway.',
      'Sunlight streamed through the window.'
    ];
  }

  getRandomItem(array: TextArray): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  getGreeting(): string {
    return this.getRandomItem(this.greetings);
  }

  getQuestion(): string {
    return this.getRandomItem(this.questions);
  }

  getSentence(): string {
    return this.getRandomItem(this.sentences);
  }

  getGreetingWithQuestion(): string {
    return `${this.getGreeting()} ${this.getQuestion()}`;
  }

  getMultipleSentences(count: number = 3): string {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.getSentence());
    }
    return result.join(' ');
  }

  // Add method to get arrays for testing or extending
  getArrays(): { greetings: TextArray; questions: TextArray; sentences: TextArray } {
    return {
      greetings: [...this.greetings],
      questions: [...this.questions],
      sentences: [...this.sentences]
    };
  }
}

// Create and export a default instance
const textGenerator = new TextGenerator();
export default textGenerator;
